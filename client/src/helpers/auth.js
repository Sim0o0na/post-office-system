import {host_address, user_login_post } from './../globals'
import axios from 'axios' 

export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export function logout() {
  console.log('kur')
  localStorage.removeItem('jwt')
  delete axios.defaults.headers.common['Authorization']
}