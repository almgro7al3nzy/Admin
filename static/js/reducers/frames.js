import {
    GET_FRAMES,
    ADD_FRAME,
    DELETE_FRAME
} from '../actions/types'


const initialState = {
   frames: []
}

export default (state = initialState, action) => {
       switch (action.type) {
    
           case GET_FRAMES:
               return{
                   ...state,
                   frames: action.payload
               }
             case ADD_FRAME: 
             return{
                ...state, 
                frames: [...state.frames, action.payload]
             }

            case DELETE_FRAME:
                return{
                    ...state,
                    frames: state.frames.filter(p => p._id !== action.payload)
            }

           default: 
           return{
               ...state
           }
        }

    }