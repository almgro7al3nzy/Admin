import {
    GET_COVERS,
    DELETE_COVER,
    ADD_COVER
} from '../actions/types'


const initialState = {
   covers: []
}

export default (state = initialState, action) => {
       switch (action.type) {
    
           case GET_COVERS:
               return{
                   ...state,
                   covers: action.payload
               }
             case ADD_COVER: 
             return{
                ...state, 
                covers: [...state.covers, action.payload]
             }

            case DELETE_COVER:
                return{
                    ...state,
                    covers: state.covers.filter(p => p._id !== action.payload)
            }

           default: 
           return{
               ...state
           }
        }

    }