import axios from 'axios'
const baseUrl = '/api/kappaleet'


const getAll = () => {
  const request = axios.get(baseUrl)
  console.log(request)
  return request.then(response => response.data)
}



export default {
  getAll
}
