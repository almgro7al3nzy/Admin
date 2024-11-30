import {io} from 'socket.io-client'
//window.location.origin
let org = process.env.REACT_APP_URL
export const socket = io(org)


