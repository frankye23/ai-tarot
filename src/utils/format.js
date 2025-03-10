export function prettyObject(msg) {
  const obj = msg
  if (typeof msg !== 'string') {
    msg = JSON.stringify(msg, null, '  ')
  }
  if (msg === '{}') {
    return obj.toString()
  }
  if (msg.startsWith('```json')) {
    return msg
  }
  return ['```json', msg, '```'].join('\n')
}