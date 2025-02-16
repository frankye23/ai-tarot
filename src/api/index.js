import { axios } from "../utils";

export function generateDialog(data) {
  return axios({
    url: '/ai-test',
    method: 'post',
    data
  })
}