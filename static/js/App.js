import React from 'react'

import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

//pages

import Dashboard from './components/dashboard/home';
import Login from './components/dashboard/login';

//redux
import {Provider} from 'react-redux'
import store from './store'


//actions
import {getCountries} from './actions/room'
import {loadUser} from './actions/user'
import {getDevices} from './actions/DEVICES'
import {getNames} from './actions/namesActions'
import {getAllRooms} from './actions/room'
import { getFrames } from './actions/frames';
import { getCovers } from './actions/covers';


class App extends React.Component{

   componentDidMount(){
   
     store.dispatch(getCountries())
     store.dispatch(getAllRooms())
     
     store.dispatch(loadUser())
     store.dispatch(getDevices())
     store.dispatch(getNames())
     store.dispatch(getFrames())
     store.dispatch(getCovers())
   }

   componentDidUpdate(){
    window.process = 'process/browser.js'
   }
   
  render(){
    


  return (
    <Provider store = {store}>
      <div className="App">

<BrowserRouter>
<Routes>
  <Route  path='/dashboard' element={<Dashboard/>} />
  <Route path='/login' element={<Login/>}/>
</Routes>
</BrowserRouter>


</div>
    </Provider>
  );
  }
}

export default App;
