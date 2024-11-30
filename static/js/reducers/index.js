import {combineReducers} from 'redux'
import errorReducer from './errorReducer'
import roomsReducer from './rooms'
import usersReducer from './user'
import packagereducer from './packages'
import namesReducer from './names'
import devicesReducer from './devices'
import frames from './frames'
import covers from './covers'

export default combineReducers({
     nameState :namesReducer,
    error: errorReducer,
    roomState : roomsReducer,
    userState: usersReducer,
    packageState: packagereducer,
    deviceState: devicesReducer,
    frameState: frames,
    coverState: covers
})
