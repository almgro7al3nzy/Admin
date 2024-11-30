import {
    GET_COVERS,
    DELETE_COVER,
    ADD_COVER
   } from './types'
   
   import axios from 'axios'
   

   export const getCovers = () => (dispatch) => {
       axios.get(`${process.env.REACT_APP_URL}/covers`)
       .then(res => {
           dispatch({
               type: GET_COVERS,
               payload: res.data
           })
       })
   }
   

   export const deleteCover = (id) => (dispatch , getState) => {
       axios.delete(`${process.env.REACT_APP_URL}/cover/${id}` , tokenConfig(getState))
       .then(res => {
           dispatch({
               type: DELETE_COVER,
               payload: res.data
           })
       })
   }
   
   export const addCover = (body) => (dispatch, getState) => {
       axios.post(`${process.env.REACT_APP_URL}/cover`, body , tokenConfig(getState))
       .then(res => {
           dispatch({
               type: ADD_COVER,
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