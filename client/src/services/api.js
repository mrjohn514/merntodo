import axios from 'axios'
import { LOGIN } from './apiconstant'
import { REGISTER } from './apiconstant'
import { ADDTASK } from './apiconstant'
import { GETALLTASK } from './apiconstant'
import { TASK } from './apiconstant'

export const login = async (data) => {
  return axios.post(LOGIN, data)
}

export const register = async (data) => {
  return axios.post(REGISTER, data)
}

export const addtask = async (data) => {
  console.log(
    'tokein of addtask',
    JSON.parse(localStorage.getItem('user')).token
  )
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  }

  return axios.post(ADDTASK, data, config)
}

export const getAllTasks = async () => {
  console.log(
    'tokein of getalltask',
    JSON.parse(localStorage.getItem('user')).token
  )
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  }
  return axios.get(GETALLTASK, config)
}

export const deleteTask = async (id) => {
  const DELETETASK = `${TASK}/${id}`

  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  }
  return axios.delete(DELETETASK, config)
}

export const updateTask = async (id, data) => {
  const UPDATETASK = `${TASK}/${id}`

  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  }
  return axios.put(UPDATETASK, data, config)
}
