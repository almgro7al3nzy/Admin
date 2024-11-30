import {
    GET_NAMES,
    EDIT_NAME, DELETE_NAME, ADD_NAME, GET_NAME
} from '../actions/types'


const initialState = {
   names: [],
   name: {}
}

export default (state = initialState, action) => {
       switch (action.type) {
           case GET_NAME:
           case EDIT_NAME:

            return{
                ...state,
                name: action.payload
            }

           case GET_NAMES:
               return{
                   ...state,
                   names: action.payload
               }
             case ADD_NAME: 
             return{
                ...state, 
                names: [...state.names, action.payload]
             }

            case DELETE_NAME:
                return{
                    ...state,
                    names: state.names.filter(p => p._id !== action.payload)
            }

           default: 
           return{
               ...state
           }
        }

    }