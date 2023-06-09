import Axios from 'axios'
import { message } from 'antd'

export const baseURL = process.env.REACT_APP_API_ROOT

const instance = Axios.create({
  baseURL,
  validateStatus: function (status) {
    return status < 500 // 处理状态码小于500的情况
  }
})

instance.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

function errorHandler(error) {
  const errorMsg = error.msg || error.message
  message.error(errorMsg)
  return Promise.reject(error)
}

export default instance
