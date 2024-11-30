import {
    GET_FRAMES,
    DELETE_FRAME,
    ADD_FRAME
   } from './types'
   
   import axios from 'axios'
   

   export const getFrames = () => (dispatch , getState) => {
       axios.get(`${process.env.REACT_APP_URL}/frames` , tokenConfig(getState))
       .then(res => {
           dispatch({
               type: GET_FRAMES,
               payload: res.data
           })
       })
   }
   

   export const deleteFrame = (id) => (dispatch, getState) => {
       axios.delete(`${process.env.REACT_APP_URL}/frame/${id}`, tokenConfig(getState))
       .then(res => {
           dispatch({
               type: DELETE_FRAME,
               payload: res.data
           })
       })
   }
   
   export const addFrame = (body) => (dispatch, getState ) => {
       axios.post(`${process.env.REACT_APP_URL}/frame`, body, tokenConfig(getState))
       .then(res => {
           dispatch({
               type: ADD_FRAME,
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