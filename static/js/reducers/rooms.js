import {GET_COUNTRIES, EDIT_COUNTRY, ADD_COUNTRY,
  DELETE_COUNTRY, GET_COUNTRY, GET_ROOMS,GET_ALL_ROOMS,
   GET_ROOM, EDIT_ROOM, DELETE_ROOM, ADD_ROOM} from '../actions/types'

const initialState = {
    countries: [],
    country: {},
    rooms: [] ,
    room: ''
}

export default (state = initialState, action) => {
       switch (action.type) {
           case GET_COUNTRIES:
               
              return {
                ...state, 
                countries: action.payload
              }

              case GET_COUNTRY:
                case EDIT_COUNTRY:
               
              return {
                ...state, 
                country: action.payload,
                
              }

              case ADD_COUNTRY:
                return{
                  ...state,
                  countries: [action.payload, ...state.countries]
                }

              case DELETE_COUNTRY: 
              return {
                ...state,
                countries: state.countries.filter(c => c._id !== action.payload )
              }
                  
              case DELETE_ROOM : 
              return {
                ...state,
                rooms: state.rooms.filter(room => room._id !== action.payload)
              }

              case ADD_ROOM: 
              return{
                ...state,
                rooms: [...state.rooms, action.payload]
              }
              case GET_ROOMS:
              case GET_ALL_ROOMS:
               
              return {
                ...state, 
                rooms: action.payload
              }

              case GET_ROOM:
               
              return {
                ...state, 
                room: action.payload
              }

              case EDIT_ROOM:
               
              return {
                ...state, 
                room: action.payload
              }
       
           default:
               return state
       }

}