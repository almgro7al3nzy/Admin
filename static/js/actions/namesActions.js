import {
     GET_NAMES,
    EDIT_NAME, DELETE_NAME, ADD_NAME, GET_NAME
   } from './types'
   
   import axios from 'axios'

import {returnErrors} from './errorActions'

   
   
   export const getName = (id) => (dispatch) => {
       axios.get(`${process.env.REACT_APP_URL}/name/${id}`)
       .then(res => {
           dispatch({
               type: GET_NAME,
               payload: res.data
           })
       })
   }
   
   export const getNames = () => (dispatch , getState) => {
       axios.get(`${process.env.REACT_APP_URL}/names`, tokenConfig(getState))
       .then(res => {
           dispatch({
               type: GET_NAMES,
               payload: res.data
           })
       })
   }
   
   export const editName = (id, body) => (dispatch , getState) => {
       axios.put(`${process.env.REACT_APP_URL}/name/${id}`, body, tokenConfig(getState))
       .then(res => {
           dispatch({
               type: EDIT_NAME,
               payload: res.data
           })
       })
       .catch(err => {
     
        dispatch(
          returnErrors(err.response.data, err.response.status, 'add name failed')
        );
       })
   }
   
   
   export const deleteName = (id, type) => (dispatch , getState) => {
       axios.delete(`${process.env.REACT_APP_URL}/name/${id}/${type}`, tokenConfig(getState))
       .then(res => {
           dispatch({
               type: DELETE_NAME,
               payload: res.data
           })
       })
   }
   
   export const addName = (body) => (dispatch, getState) => {
       axios.post(`${process.env.REACT_APP_URL}/name`, body, tokenConfig(getState))
       .then(res => {
           dispatch({
               type: ADD_NAME,
               payload: res.data
           })
       })

       .catch(err => {
     
        dispatch(
          returnErrors(err.response.data, err.response.status, 'add name failed')
        );
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