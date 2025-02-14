import { axios, aiAxios } from "../utils";

export function generateDialog(data) {
  return aiAxios({
    url: '/chat/completions',
    method: 'post',
    data
  })
}