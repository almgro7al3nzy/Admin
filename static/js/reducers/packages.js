import {
    GET_PACKAGE,
    GET_PACKAGES,
    EDIT_PACKAGE,
    DELETE_PACKAGE,
    ADD_PACKAGE
} from '../actions/types'


const initialState = {
   packages: [],
   package: {}
}

export default (state = initialState, action) => {
       switch (action.type) {
           case GET_PACKAGE:
           case EDIT_PACKAGE:

            return{
                ...state,
                package: action.payload
            }

           case GET_PACKAGES:
               return{
                   ...state,
                   packages: action.payload
               }
             case ADD_PACKAGE: 
             return{
                ...state, 
                packages: [...state.packages, action.payload]
             }

            case DELETE_PACKAGE:
                return{
                    ...state,
                    packages: state.packages.filter(p => p._id !== action.payload)
            }

           default: 
           return{
               ...state
           }
        }

    }