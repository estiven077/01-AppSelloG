import axios from 'axios'
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {Accept:'application/json'}
})
export default api
