import {
   GET_USER,
   ADD_USER,
   UPDATE_USER,
   ROOM_USERS,
   DELETE_USER,  UNBLOCK_USER,
   USER_LOADED, USER_LOADING, AUTH_ERROR,
   LOGIN_SUCCESS, LOGIN_FAILED , LOGOUT_SUCCESS,
   UPDATE_PROFILE,
   GET_USERHISTORY, DELETE_USERHISTORY,
   GET_MASTERSREPORTS, DELETE_MASTERSREPORTS,
   GET_FRIEND,GET_ALL_USERS, 
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: true,
     me: '',
    users: [],
    blocked: [],
    user_history: [],
    mastersReports: [],
    friend: {}
}

 const usred =  (state = initialState, action) => {
       switch (action.type) {
           case USER_LOADING:
            return{
                ...state,
                isLoading:true
            }
        case USER_LOADED:
            return{
                ...state,
                isLoading: false,
                isAuthenticated:true,
                me: action.payload  
           }  
            case LOGIN_SUCCESS:
                
               localStorage.setItem('token', action.payload.token)
               return{
                   ...state,
                   me: action.payload.user,
                   isLoading: false,
                   isAuthenticated: true
               }

            case GET_FRIEND : 
            return{
                ...state, 
                friend: action.payload
            }   

            case LOGIN_FAILED:
            case AUTH_ERROR:
                case LOGOUT_SUCCESS:
                localStorage.removeItem('token')
                return{
                    ...state,
                    token: null,
                    me : null,
                    isAuthenticated: false,
                    isLoading: false
                }
                case UPDATE_PROFILE: 
                return{
                    ...state,
                    me: action.payload
                }
           case GET_USER:
               case UPDATE_USER:
              
              return {
                ...state, 
                user: action.payload
              }
              case ROOM_USERS:
              return{
                  ...state,
                  users: action.payload, 
                  blocked: action.payload.filter(user => user.blocked)
              }
               
                case ADD_USER:
                    
                return{
                    ...state,
                    users: [ ...state.users, action.payload]
                }

                case GET_ALL_USERS:
                    
                return{
                    ...state,
                    users: action.payload}
                  case DELETE_USER:
                  return{
                      ...state,
                      users: state.users.filter(user => user._id !== action.payload)
                  }
                  case UNBLOCK_USER:
                  return{
                      ...state,
                      blocked: state.blocked.filter(user => user._id !== action.payload)
                  } 
                  case GET_USERHISTORY: 
                  return{
                      ...state,
                      user_history: action.payload

                  }
                  case DELETE_USERHISTORY: 
                  return{
                     ...state,
                      user_history: []
                  }

                  case GET_MASTERSREPORTS: 
                  return{
                      ...state,
                      mastersReports: action.payload

                  }

                  case DELETE_MASTERSREPORTS: 
                  return{
                    ...state,
                    mastersReports: []

                }

           default:
               return state
       }

}

export default usred