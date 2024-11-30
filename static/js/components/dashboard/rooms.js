import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'

import Delete from './deleteRoomModal'
import Edit from './editRoomModal'
import NewRoom from './newRoomModal'

import {connect } from 'react-redux'
import {getRoom, editRoom, deleteRoom, addRoom, getRooms} from '../../actions/room'

import {Modal , ModalBody, ModalHeader} from 'react-bootstrap'
import { socket } from '../socket'

class Rooms extends React.Component{

    state = {
        delete: false,
        edit: false,
        newRoom: false,
        publicMsg: false
    }

    handleDelete = (room_name, room_id, e) => {
        if(!this.state.delete){
            this.setState({room_name, room_id})
        }
        this.setState({delete : !this.state.delete})
    }

    handleEdit= (id) => {
        if(!this.state.edit){
        this.props.getRoom(id)
          
        }
        this.setState({edit : !this.state.edit})
    }

    handleNewRoom= () => {
        this.setState({newRoom : !this.state.newRoom})
    }

    onDelete = () => {
        this.props.deleteRoom(this.state.room_id)
        this.handleDelete()
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSend = () => {

        this.setState({success: false})
        let text = this.state.text

        socket.emit('send-msg-public' , {text})

        this.setState({success: 'تم ارسال رسالة عامة'})
    }

    render(){


        let rooms = this.props.roomState.rooms || []

        const getDate = (date) => {
            let date_  = new Date(date)
            return date_.toLocaleDateString()
        }

        return(
            <div className='mt-4 text-center'>

           

               <h4>الغرف</h4>

               <button onClick = {this.handleNewRoom} className='btn px-2 shadow-sm' style={{background: '#fff6a9', border: '#fff6a9'}}> + انشاء غرفة </button>

               <div className='card shadow my-4 mx-auto' style={{maxWidth: '95%', width: '1300px', height: '500px', overflow: 'hidden', background: '#e8f4ff'}}>
                
                <div className='card-body' style={{overflow: 'auto'}}>
                <table className='' style={{minWidth: '100%', color: 'black'}}>

<thead className='mx-auto ' style={{ borderBottom: '.5px solid #ff5e00 ' }}>
    <tr>
        <th >اسم الغرفة </th>
     <th >البلد </th>
        <th >سعة الغرفة </th>

        <th >تاريخ الانشاء </th>
        <th >نوع الباقة </th>

        <th >تاريخ الاشتراك </th>
        <th >تاريخ الانتهاء </th>
    </tr>
</thead>

<tbody  >

    {rooms.map(room => (
        <tr id='report'>
        <td>{room.name}</td>
        <td>{room.country}</td>
        
        <td>{room.capacity}</td>

        <td>{getDate(room.date)}</td>
        <td>{room.package_name}</td>
        <td>{getDate(room.start_date)}</td>
        <td>{getDate(room.end_date)}</td>

        <td>
            <FontAwesomeIcon icon={faEdit} onClick={this.handleEdit.bind(this, room._id)} className='text-success'/>
        </td>

        <td>
            <FontAwesomeIcon icon={faTrash}  onClick={this.handleDelete.bind(this, room.name, room._id)} className='text-danger'/>
        </td>

    </tr>
    ))}



</tbody>



</table>

<Delete delete ={this.state.delete}
        room_name = {this.state.room_name}
         room_id = {this.state.room_id}
         handleDelete = {this.handleDelete}
         onDelete ={this.onDelete}/>

<Edit edit= {this.state.edit}
       room_name = {this.state.room_name}
       room_id = {this.state.room_id}
       handleEdit= {this.handleEdit} />   

       <NewRoom newRoom= {this.state.newRoom}
       handleNewRoom= {this.handleNewRoom} />         

                </div>
               </div>

               
            </div>
        )
    }
}


const mapState  =(state) => ({
    roomState: state.roomState
})

export default connect(mapState, {getRoom, deleteRoom, editRoom, addRoom, getRooms})(Rooms)