import axios from "axios";
import {GET_COUNTRIES, EDIT_COUNTRY, GET_COUNTRY, DELETE_COUNTRY
    ,ADD_ROOM, DELETE_ROOM, GET_ROOM, EDIT_ROOM,
     GET_ROOMS, ADD_COUNTRY, GET_ALL_ROOMS} from './types'


     const add_janus_room = (id) => {
        axios.post(`${process.env.REACT_APP_URL}:8089/janus`, {
            "janus": "create",
            "transaction": "random-string"
          })
          .then(res => {
            if(res.data?.data?.id){
                let sessionId = res.data.data.id
                axios.post(`${process.env.REACT_APP_URL}:8089/janus/${sessionId}`, {
                    "janus": "attach",
                    "plugin": "janus.plugin.videoroom",
                    "transaction": "random-string"
                  }
                  ).then(res => {
                    if(res.data?.data?.id){
                        let handleId = res.data.data.id
                        axios.post(`${process.env.REACT_APP_URL}:8089/janus/${sessionId}/${handleId}` , {
                            "janus": "message",
                            "body": {
                              "request": "create",
                              "room": id,
                              "description": "My Test Room",
                              "secret": "mysecret",
                              "publishers": 1,
                              "bitrate": 256000,
                              "audiocodec": "opus",
                              "videocodec": "vp8",
                              "record": false, 
                              "permanent": true
                            },
                            "transaction": "random-string"
                          }).then(res => {
                            axios.post(`${process.env.REACT_APP_URL}:8089/janus/${sessionId}`, {
                                "janus": "destroy",
                                "transaction": "random-string"
                              })
                              .then(res => {
                                console.log('Session closed:', res);
                              })
                          })
                    }
                  })
            }
          })
     }
     
//get countries
export const getCountries = () => dispatch => {

    axios.get(`${process.env.REACT_APP_URL}/countries`)
    .then(res => {
        dispatch({
            type: GET_COUNTRIES, 
            payload: res.data
        })
    })
}

//get country
export const getCountry = (id) => dispatch => {

    axios.get(`${process.env.REACT_APP_URL}/country/${id}`)
    .then(res => {
        dispatch({
            type: GET_COUNTRY, 
            payload: res.data
        })
    })
}

//get countries
export const editCountry = (id, body) => (dispatch, getState) => {

    axios.post(`${process.env.REACT_APP_URL}/country/${id}`, body, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: EDIT_COUNTRY, 
            payload: res.data
        })
    })

}



//get countries
export const addCountry = (body) => (dispatch, getState) => {

    axios.post(`${process.env.REACT_APP_URL}/country`, body, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: ADD_COUNTRY, 
            payload: res.data
        })
    })
}




//delete countries
export const deleteCountry = (id) => (dispatch, getState) => {

    axios.delete(`${process.env.REACT_APP_URL}/country/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: DELETE_COUNTRY, 
            payload: res.data
        })
    })
}

//get room
export const addRoom = ( body) => (dispatch, getState) => {

    axios.post(`${process.env.REACT_APP_URL}/room/`, body, tokenConfig(getState))
    .then(res => {
        if(res.data?.number) add_janus_room(res.data?.number)
        dispatch({
            type: ADD_ROOM, 
            payload: res.data
        })
    })
}

//get room
export const getRoom = (id) => (dispatch) => {

    axios.get(`${process.env.REACT_APP_URL}/room/${id}`)
    .then(res => {
        dispatch({
            type: GET_ROOM, 
            payload: res.data
        })
    })
}

//get room
export const deleteRoom = (id) => (dispatch, getState) => {

    axios.delete(`${process.env.REACT_APP_URL}/room/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: DELETE_ROOM, 
            payload: res.data
        })
    })
}


//edit room
export const editRoom = (id, body) => (dispatch , getState) => {

    axios.put(`${process.env.REACT_APP_URL}/room/${id}`, body, tokenConfig(getState))
    .then(res => {

        dispatch({
            type: EDIT_ROOM, 
            payload: res.data
        })
        
    })
    
}

//get rooms
export const getRooms = (country) => (dispatch) => {

    axios.get(`${process.env.REACT_APP_URL}/rooms/${country}`)
    .then(res => {
        dispatch({
            type: GET_ROOMS, 
            payload: res.data
        })
    })
}


//get rooms
export const getAllRooms = () => dispatch => {

    axios.get(`${process.env.REACT_APP_URL}/rooms`)
    .then(res => {
        dispatch({
            type: GET_ALL_ROOMS, 
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


