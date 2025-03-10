import { fetchEventSource } from '@fortaine/fetch-event-source'
import { prettyObject } from './format'

const baseUrl = import.meta.env.VITE_BASE_API

export function useEventStream() {
  const REQUEST_TIMEOUT_MS = 10000;

  // 创建事件流来处理AI模型的实时响应
  // messages 是数组， promptMsg是字符串
  function createEventStream(messageId, model, token, messages, promptMsg, controller) {
    try {
      const chatPath = encodeURI(baseUrl + '/ai-stream');

      // 设置请求超时
      const requestTimeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      const streamState = {
        responseText: '',
        remainText: '',
        finished: false,
        responseData: {}
      };

      // 启动文本动画处理
      setupTextAnimation(messages, streamState);

      // 设置请求完成处理函数
      const finish = createFinishHandler(messages, streamState);

      // 当请求被中止时执行finish函数
      controller.signal.onabort = finish;

      // 发起SSE请求
      initEventSource(chatPath, promptMsg, model, token, controller, requestTimeoutId, streamState, finish);
    } catch (err) {
      console.error('createEventStream error:', err);
    }
  }

  // 设置文本动画处理
  function setupTextAnimation(messages, streamState) {
    function animateResponseText() {
      if (streamState.remainText.length > 0) {
        const fetchCount = Math.max(1, Math.round(streamState.remainText.length / 60));
        const fetchText = streamState.remainText.slice(0, fetchCount);
        streamState.responseText += fetchText;
        streamState.remainText = streamState.remainText.slice(fetchCount);

        updateOrCreateMessage(messages, streamState);
      }

      requestAnimationFrame(animateResponseText);
    }

    requestAnimationFrame(animateResponseText);
  }

  // 更新现有消息或创建新消息
  function updateOrCreateMessage(messages, streamState) {
    const { responseText } = streamState;

    messages[1].loading = false
    messages[1].text = responseText
  }

  // 创建请求完成处理函数
  function createFinishHandler(messages, streamState) {
    return () => {
      if (!streamState.finished) {
        streamState.finished = true;

        const existingMessageIndex = messages.findIndex(
          msg => (msg.id === `${streamState.responseData.parent_id}-${streamState.responseData.model_name}` && msg.role === 'assistant') ||
                 msg.id === `first-${streamState.responseData.model_name}`
        );

        if (existingMessageIndex !== -1) {
          messages[existingMessageIndex].loading = false;
        }
      }
    };
  }

  // 初始化事件源并处理响应
  function initEventSource(chatPath, promptMsg, model, token, controller, requestTimeoutId, streamState, finish) {
    fetchEventSource(chatPath, {
      method: 'POST',
      body: JSON.stringify({ message: promptMsg }),
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json'
      },
      onopen(res) {
        handleConnectionOpen(res, requestTimeoutId, streamState, finish);
      },
      onmessage(msg) {
        handleMessage(msg, streamState, finish);
      },
      onclose() {
        finish();
      },
      onerror(err) {
        console.error('Stream error:', err);
        throw err;
      },
      openWhenHidden: true
    });
  }

  // 处理连接打开事件
  async function handleConnectionOpen(res, requestTimeoutId, streamState, finish) {
    clearTimeout(requestTimeoutId);
    const contentType = res.headers.get('content-type');

    if (contentType?.startsWith('text/plain')) {
      streamState.responseText = await res.clone().text();
      return finish();
    }

    if (!res.ok || !res.headers.get('content-type')?.startsWith('text/event-stream') || res.status !== 200) {
      await handleErrorResponse(res, streamState);
      return finish();
    }
  }

  // 处理错误响应
  async function handleErrorResponse(res, streamState) {
    const responseTexts = [streamState.responseText];
    let extraInfo = await res.clone().text();

    try {
      const resJson = await res.clone().json();
      extraInfo = prettyObject(resJson);
    } catch {}

    if (res.status === 401) {
      responseTexts.push('没有权限');
    }

    if (extraInfo) {
      responseTexts.push(extraInfo);
    }

    streamState.responseText = responseTexts.join('\n\n');
  }

  // 处理接收到的消息
  function handleMessage(msg, streamState, finish) {
    try {
      if (msg.data === '[DONE]') {
        return finish();
      }

      const text = msg.data;

      if (!text || text === 'null') {
        return finish();
      }

      streamState.remainText += text
    } catch (error) {
      console.error('[Request] parse error:', error);
      finish();
    }
  }

  // 中止事件流
  function abortStream(controller) {
    controller.abort();
  }

  return {
    createEventStream,
    abortStream
  };
}
