import React from 'react'
import Nav from './sideNav'

import Rooms from './rooms'
import Countries from './countries'
import Users from './users'
import Names from './names'
import Devices from './devices'
import Special from './names_special'
import Support from './support'

import {connect} from 'react-redux'
import {getCountries, getAllRooms} from '../../actions/room'
import {getPackages} from '../../actions/packages'
import { getNames} from '../../actions/namesActions'
import {getAllUsers, logout} from '../../actions/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Frames from './Frames'
import Covers from './covers'

class Dashboard extends React.Component{

    componentDidMount(){
        this.props.getCountries()
        this.props.getAllRooms()
        this.props.getPackages()
        this.props.getNames()
        this.props.getAllUsers()
    }

    state = {
        selected: 'Rooms'
    }

    onSelect = (selected) => {
        this.setState({selected})
    }

    onClickNav = () => {
       
            this.setState({sideNav: !this.state.sideNav, mini: true})
    
    }

    onLogout =() => {
        this.props.logout()
        window.location.href='/login'
    }
    render(){

        let rooms = this.props.roomState.rooms
        let names = this.props.nameState.names
        let users = this.props.userState.users
        return(
            <div>
                
           {true ? 
               <div className='d-flex'>
                                   
               <div className='reports mx-auto ' style={{width: '95%'}}>
                      {/** first reports cards */}
             <div className='row mx-auto justify-content-center 
             pt-5 mx-auto ' style = {{direction: 'ltr',}}>
                 <div className='card shadow mx-0 mx-md-3 my-3' style={{ background: 'linear-gradient(to right, rgb(205 41 253), rgb(249 152 255))' }} >
                     <div className='card-body mt-3 ' style={{ width: 'fit-content' }}>
                           <h5 className='mt-3'>اجمالي المستخدمين</h5> 
                            <h4 className='mt-3'>{users.length}</h4>
                     </div>
                     <div className='first-circle'></div>
                     <div className='sec-circle'></div>
                 </div>
                 <div className='card shadow mr-0 mx-md-3 my-3' style={{ background: 'linear-gradient(to right,  rgb(118 144 255), rgb(137 188 251))' }} >
                     <div className='card-body mt-3' style={{ width: 'fit-content' }}>
                          <h5 className='mt-3'>
                              الاسماء المسجلة
                          </h5>  <h4 className='mt-3'>{names.length}</h4>
                     </div>
                     <div className='first-circle'></div>
                     <div className='sec-circle'></div>
                 </div>
                 <div className='card shadow mr-0 mx-md-3 my-3' style={{ background: 'linear-gradient(to left, #eedfc3, #ef6d6d)' }} >
                     <div className='card-body mt-3 ' style={{ width: 'fit-content' }}>
                          <h5 className='mt-3'>
                              اجمالي الغرف
                          </h5> <h4 className='mt-3'>{rooms.length}</h4>
                     </div>
 
                     <div className='first-circle'></div>
                     <div className='sec-circle'></div>
                 </div>
             </div>
 
             {this.state.selected === 'rooms' ? 
         <Rooms/> : 
             this.state.selected === 'names'? 
             <Names/>: 
             this.state.selected === 'users'?
             <Users/>:
         
             this.state.selected === 'devices'? 
             <Devices/>:
             this.state.selected === 'names_special'? 
             <Special/>:
             this.state.selected === 'support'? 
             <Support/>
             :this.state.selected === 'frames'? 
             <Frames/>:
             this.state.selected === 'covers'? 
             <Covers/>:
              <Countries/>
             }
 
 
               </div>
 
               
                  
 
         
                 <div className='side' style={{width: '250px', minWidth: '250px', display: this.state.sideNav ? 'block' : ''}}>
                 <Nav onSelect = {this.onSelect} 
                      onClickNav ={this.onClickNav}
                      logout = {this.onLogout}/>
 
                
                 </div>
                  
                 <div className = 'mini-side' style={{width: '50px',}}>
                 <div className='text-center pt-3' style={{display: 'fixed' , width: '50px', height: '100%', background: 'rgb(255, 246, 169)'}}>
                     <FontAwesomeIcon onClick ={this.onClickNav} style={{fontSize: '25px'}}  icon = {faBars}/>
                 </div>
                 </div>
                </div>
  : ''}

               

            </div>
        )
    }
}

const mapState = (state) => ({
    roomState: state.roomState,
    nameState: state.nameState,
    userState : state.userState
})


export default connect(mapState, {getCountries, getAllRooms, getPackages,logout, getNames, getAllUsers}) (Dashboard)