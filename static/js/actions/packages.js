import {
 GET_PACKAGE, GET_PACKAGES, DELETE_PACKAGE, EDIT_PACKAGE,
 ADD_PACKAGE
} from './types'

import axios from 'axios'


export const getPackage = (id) => (dispatch) => {
    axios.get(`${process.env.REACT_APP_URL}/package/${id}`)
    .then(res => {
        dispatch({
            type: GET_PACKAGE,
            payload: res.data
        })
    })
}

export const getPackages = () => (dispatch) => {
    axios.get(`${process.env.REACT_APP_URL}/packages`)
    .then(res => {
        dispatch({
            type: GET_PACKAGES,
            payload: res.data
        })
    })
}

export const editPackage = (id, body) => (dispatch, getState) => {
    axios.put(`${process.env.REACT_APP_URL}/package/${id}`, body, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: EDIT_PACKAGE,
            payload: res.data
        })
    })
}


export const deletePackage = (id) => (dispatch, getState) => {
    axios.delete(`${process.env.REACT_APP_URL}/package/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: DELETE_PACKAGE,
            payload: res.data
        })
    })
}

export const addPackage = (body) => (dispatch, getState) => {
    axios.post(`${process.env.REACT_APP_URL}/package`, body, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: ADD_PACKAGE,
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