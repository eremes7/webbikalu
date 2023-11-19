import axios from 'axios'
const baseUrl = '/api/kappaleet'

let token = null

const setToken = newToken => {
  token = `Bearer ${newtoken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  console.log(request)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token}
  }

 const response = await axios.get(baseUrl, newObject, config)
    return response.data
  }

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

export default {
  getAll, create, update, setToken
}
