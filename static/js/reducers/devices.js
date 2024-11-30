import {
    GET_DEVICES,
    DELETE_DEVICE,
    ADD_DEVICE
} from '../actions/types'


const initialState = {
   devices: []
}

export default (state = initialState, action) => {
       switch (action.type) {
           case GET_DEVICES:
        

            return{
                ...state,
                devices: action.payload
            }

             case ADD_DEVICE: 
             return{
                ...state, 
                devices: [...state.devices, action.payload]
             }

            case DELETE_DEVICE:
                return{
                    ...state,
                    devices: state.devices.filter(p => p._id !== action.payload)
            }

           default: 
           return{
               ...state
           }
        }

    }