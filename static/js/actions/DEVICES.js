import {
   GET_DEVICES, DELETE_DEVICE, ADD_DEVICE
   } from './types'
   
   import axios from 'axios'
   

   
   export const addDevice = (body) => (dispatch) => {
       axios.post(`${process.env.REACT_APP_URL}/device_blocked`, body)
       .then(res => {
           dispatch({
               type: ADD_DEVICE,
               payload: res.data
           })
       })
   }
 
   
   
   export const deleteDevice = (id) => (dispatch) => {
       axios.delete(`${process.env.REACT_APP_URL}/device_blocked/${id}`)
       .then(res => {
           dispatch({
               type: DELETE_DEVICE,
               payload: res.data
           })
       })
   }
   
   export const getDevices = () => (dispatch) => {
       axios.get(`${process.env.REACT_APP_URL}/devices_blocked`)
       .then(res => {
           dispatch({
               type: GET_DEVICES,
               payload: res.data
           })
       })
   }
   
   
   // Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().userState.token;
  
    // Headers
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
  
    // If token, add to headers
    if (token) {
      config.headers['x-auth-token'] = token;
    }
  
    return config;
  };