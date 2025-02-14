import { axios } from "../utils";

export function generateDialog(data) {
  return axios({
    url: '/chat',
    method: 'post',
    data
  })
}