import axios from 'axios'
import {
   GET_USER,
   ADD_USER,
   UPDATE_USER,
   ROOM_USERS,
   DELETE_USER, BLOCK_USER, UNBLOCK_USER,
   USER_LOADED, USER_LOADING, AUTH_ERROR,
   LOGIN_SUCCESS, LOGIN_FAILED , LOGOUT_SUCCESS,
   UPDATE_PROFILE, GET_USERHISTORY , DELETE_USERHISTORY, GET_MASTERSREPORTS
   , DELETE_MASTERSREPORTS,
   GET_FRIEND, GET_ALL_USERS,
} from './types'

import {returnErrors} from './errorActions'



// Check token & load user
export const loadUser = () => (dispatch, getState) => {


  // User loading
  dispatch({ type: USER_LOADING });

  axios.get(`${process.env.REACT_APP_URL}/auth`, tokenConfig(getState))
    .then(res =>{
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    
    })
    .catch(err => {
      
      if(window.location.pathname === `/dashboard`){
        window.location.pathname = `/login`
      }
      dispatch(returnErrors(err.response.data, err.response.status, `auth error`));
      dispatch({
        type: AUTH_ERROR
      });
    });
};



// Login User
export const login = (body) => dispatch => {


  axios
    .post(`${process.env.REACT_APP_URL}/login`, body)
    .then(res =>{ 
      
        dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      window.location.href= `${process.env.REACT_APP_URL_F}/room?${body.room_id}`
    } )
    .catch(err => {
     
      dispatch(
        returnErrors(err.response.data, err.response.status, `login failed`)
      );
      dispatch({
        type: LOGIN_FAILED
      });
    });
};


// Login User
export const admin_login = (body) => (dispatch, getState) => {


  axios
    .post(`${process.env.REACT_APP_URL}/admin/login`, body )
    .then(res =>
      { 
      
        dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      window.location.href= `/dashboard`
    }
    )
    .catch(err => {
     
      dispatch(
        returnErrors(err.response.data, err.response.status, `login failed`)
      );
      dispatch({
        type: LOGIN_FAILED
      });
    });
};


//get user
export const getUser = (id) => dispatch => {

    axios.get(`${process.env.REACT_APP_URL}/user/${id}`)
    .then(res => {
        dispatch({
            type: GET_USER, 
            payload: res.data
        })
    })
}

//get user
export const getAllUsers = () => dispatch => {

  axios.get(`${process.env.REACT_APP_URL}/users`)
  .then(res => {
      dispatch({
          type: GET_ALL_USERS, 
          payload: res.data
      })
  })
}



//get user
export const getFriend = (id) => dispatch => {

  axios.get(`${process.env.REACT_APP_URL}/user/friend/${id}`)
  .then(res => {
      dispatch({
          type: GET_FRIEND, 
          payload: res.data
      })
  })
}


//get user
export const getRoomUsers = (roomId) => dispatch => {

    axios.get(`${process.env.REACT_APP_URL}/users/${roomId}`)
    .then(res => {
        dispatch({
            type: ROOM_USERS, 
            payload: res.data
        })
    })
}

//block user
export const blockUser = (id, body,  roomId) => dispatch => {

    axios.post(`${process.env.REACT_APP_URL}/block/${id}`, body)
    .then(res => {
        dispatch({
            type: BLOCK_USER, 
            payload: res.data
        })
        
        axios.get(`${process.env.REACT_APP_URL}/users/${roomId}`)
    .then(res => {
        dispatch({
            type: ROOM_USERS, 
            payload: res.data
        })
    })

    })
}

//block user
export const unblockUser = (id, body , roomId) => dispatch => {
  
    axios.post(`${process.env.REACT_APP_URL}/unblock/${id}`, body)
    .then(res => {
        dispatch({
            type: UNBLOCK_USER, 
            payload: res.data
        })

        axios.get(`${process.env.REACT_APP_URL}/users/${roomId}`)
    .then(res => {
        dispatch({
            type: ROOM_USERS, 
            payload: res.data
        })
    })
    })
}

//post user
export const addUser = (body) => dispatch => {

    axios.post(`${process.env.REACT_APP_URL}/user`, body)
    .then(res => {
        dispatch({
            type: ADD_USER, 
            payload: res.data
        })
    })
    .catch(err => {
    
      dispatch(returnErrors(err.response.data, err.response.status, `add account failed`));
     
    });
}

//update user
export const updateUser = (id, body) => dispatch => {

    axios.put(`${process.env.REACT_APP_URL}/user/${id}`, body)
    .then(res => {
        dispatch({
            type: UPDATE_USER, 
            payload: res.data
        })
    })
    .catch(err => {
    
      dispatch(returnErrors(err.response.data, err.response.status, `update account failed`));
     
    });
}

//update user
export const updateProfile = (id, body) => dispatch => {

  axios.put(`${process.env.REACT_APP_URL}/user/${id}`, body)
  .then(res => {
      dispatch({
          type: UPDATE_PROFILE, 
          payload: res.data
      })
  })
  .catch(err => {
    
    dispatch(returnErrors(err.response.data, err.response.status, `update account failed`));
   
  });
}

//delete user
export const deleteUser = (id, roomId) => (dispatch, getState) => {
    axios.delete(`${process.env.REACT_APP_URL}/user/${id}` , tokenConfig(getState))
    .then(res => {
        dispatch({
            type: DELETE_USER, 
            payload: res.data
        })

     if(roomId){
      axios.get(`${process.env.REACT_APP_URL}/users/${roomId}`)
      .then(res => {
          dispatch({
              type: ROOM_USERS, 
              payload: res.data
          })
      })
     }
    })
}

//get user history
export const getUserHistory = (id) => dispatch => {
    axios.get(`${process.env.REACT_APP_URL}/userHistory/${id}`)
    .then(res => {
        dispatch({
            type: GET_USERHISTORY, 
            payload: res.data
        })
    })
}

//delete user history
export const deleteUserHistory = (id) => dispatch => {
    axios.delete(`${process.env.REACT_APP_URL}/userHistory/${id}`)
    .then(res => {
        dispatch({
            type: DELETE_USERHISTORY, 
            payload: res.data
        })
    })
}

//get masters reports
export const getMastersReports = (id) => dispatch => {
  axios.get(`${process.env.REACT_APP_URL}/mastersReports/${id}`)
  .then(res => {
      dispatch({
          type: GET_MASTERSREPORTS, 
          payload: res.data
      })
  })
}

//get masters reports
export const deleteMastersReports = (id) => dispatch => {
  axios.delete(`${process.env.REACT_APP_URL}/mastersReports/${id}`)
  .then(res => {
      dispatch({
          type: DELETE_MASTERSREPORTS, 
          payload: res.data
      })
  })
}



// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};




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