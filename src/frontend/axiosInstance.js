import axios from 'axios'

const axiosApi = axios.create({
  // baseURL: import.meta.env.VITE_BASEURL
  baseURL: 'http://localhost:3000'

})

export default axiosApi
