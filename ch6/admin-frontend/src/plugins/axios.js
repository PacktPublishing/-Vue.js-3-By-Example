import axios from 'axios'
import { APIURL } from '@/constants'

axios.interceptors.request.use((config) => {
  if (config.url.includes(APIURL) && !config.url.includes('login')) {
    config.headers['x-token'] = localStorage.getItem('token')
    return config
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
