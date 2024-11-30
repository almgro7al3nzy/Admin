import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'

import Delete from './deleteUser'
import Edit from './editUser'
import NewUser from './newUser'

import {connect} from 'react-redux'
import {deleteUser, getUser} from '../../actions/user'

class Users extends React.Component{

 

    state = {
        delete: false,
        edit: false,
        newUser: false
    }

    handleDelete = (user_id, user_name) => {

        if(!this.state.delete){
            this.setState({user_id, user_name})
        }
        this.setState({delete : !this.state.delete})
    }

    handleEdit= (id) => {
        if(!this.state.edit){
            this.props.getUser(id)
            setTimeout(() => {
            this.setState({edit : !this.state.edit})
                
            }, 500);
        }
        else{
            this.setState({edit : !this.state.edit})
        }
    }

    handleNewUser= () => {
        this.setState({newUser : !this.state.newUser})
    }

    onDelete = () => {
        this.props.deleteUser(this.state.user_id)
    }
    render(){

        let key = 1

        let all_users = this.props.userState.users || []

        let users = all_users.filter(u => u.type === 'master'  || u.type === 'root')

        const getDate = (date) => {
            let date_  = new Date(date)
            return date_.toLocaleDateString()
        }

        const getRoom = (id) => {
            let rooms = this.props.roomState.rooms || []
            let room = rooms.filter(r => r._id === id)

            
            return room[0] ?room[0].name :'-'
        }

        return(
            <div className='mt-4 text-center'>
               <h4>المستخدمين</h4>

               <button onClick = {this.handleNewUser} className='btn px-2 shadow-sm' style={{background: '#fff6a9', border: '#fff6a9'}}> + اضافة مستخدم </button>

               <div className='card shadow my-4 mx-auto' style={{maxWidth: '95%', width: '1300px', height: '500px', overflow: 'hidden', background: '#e8f4ff'}}>
                
                <div className='card-body' style={{overflow: 'auto'}}>
                <table className='' style={{minWidth: '100%', color: 'black'}}>

<thead className='mx-auto ' style={{ borderBottom: '.5px solid #ff5e00 ' }}>
    <tr>

     <th >الاسم </th>
        <th >النوع </th>
        <th >الغرفة </th>
          <th>تاريخ التسجيل</th>
    </tr>
</thead>

<tbody  >

    {users.map(user => (
        <tr id='report' key = {key ++}>
     
        <td>{user.name}</td>

        <td>{user.type}</td>
        <td>{getRoom(user.room_id)}</td>
        <td>{getDate(user.date)}</td>
      
        <td>
            <FontAwesomeIcon icon={faEdit}  onClick={this.handleEdit.bind(this, user._id)} className='text-success'/>
        </td>

        <td>
            <FontAwesomeIcon icon={faTrash}  onClick={this.handleDelete.bind(this, user._id, user.name)} className='text-danger'/>
        </td>

    </tr>
    ))}



</tbody>



</table>

<Delete delete ={this.state.delete}
        user_name = {this.state.user_name}
         handleDelete = {this.handleDelete}
         onDelete = {this.onDelete}
         />

<Edit edit= {this.state.edit}
       user_name = {this.state.user_name}
       handleEdit= {this.handleEdit} />   

       <NewUser newUser= {this.state.newUser}
       handleNewUser= {this.handleNewUser} />     

                </div>
               </div>

               
            </div>
        )
    }
}

const mapState =(state) => ({
    userState: state.userState,
    roomState: state.roomState
})
export default connect(mapState, {deleteUser, getUser}) (Users)