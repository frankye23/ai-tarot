import { axios } from "../utils";

export function generateDialog(data) {
  return axios({
    url: '/ai-stream',
    method: 'post',
    data
  })
}