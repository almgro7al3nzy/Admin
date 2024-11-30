import React from "react";

import {Modal} from 'react-bootstrap'

import {connect} from 'react-redux'
import {addUser} from '../../actions/user'
import {clearErrors} from '../../actions/errorActions'

class NewUser extends  React.Component{

    
    state = {
        user_type: 'master',
        color: 'black',
        permissions:{ master: {
            block_device: true,
            kick_out: true,
            stop: true,
            mic: true,
            public_msg: true,
            remove_msgs: true,
            cancel_block: true,
            logout_history: true,
            accounts_control: true,
            member_control: true,
            admin_control: true,
            super_admin_control: true,
            master_control: true,
            room_settings: true,
            masters_reports: true
        },
        root: {
            block_device: true,
            kick_out: true,
            stop: true,
            mic: true,
            public_msg: true,
            remove_msgs: true,
            cancel_block: true,
            logout_history: true,
            accounts_control: true,
            member_control: true,
            admin_control: true,
            super_admin_control: true,
            master_control: true,
            room_settings: true,
            masters_reports: true
        },
}
    
    }

    onClick = (e) => {
        let user_type = e.target.value
    
       
       this.setState({
           user_type, 
      
       })
   }

   onChange = (e) => {
       this.setState({
           [e.target.name]: e.target.value
       })
   }

   onChangePermission = (e) => {

       let permissions =this.state.permissions
           permissions[e.target.name] = !permissions[e.target.name]
       this.setState({
           permissions
       })
   }

   
   onSave = () => {

    this.props.clearErrors()
    let rooms = this.props.roomState.rooms || []

    this.setState({err: false, success: false})
    
    const {name, user_type, room_password, permissions, start_date , end_date} = this.state
    const body = {name, 
                  type: user_type , 
                  room_password,
                  permissions: permissions[user_type],
                   room_id : this.state.room_id || rooms[0]._id,
                start_date, end_date}

    if(name && room_password){
        this.props.addUser(body)
        this.setState({success: 'تم اضافة العضو بنجاح'})
    }else{
        this.setState({err: 'الرجاء ادخال الاسم و كلمة المرور'})
    }
}


    render(){

        let user_type = this.state.user_type

        let rooms = this.props.roomState.rooms || []


        let key1 = 1
  
        return(
            <div>

                <Modal show= {this.props.newUser} onHide = {this.props.handleNewUser}>
                    
                    <Modal.Body className="text-center">
                         <h5 className="mt-3">اضافة مستخدم</h5>

                         <div className="mt-5">
                           
                         <div>

<div>
<input  className='add_account_input' style={{color: this.state.color}} name = 'name' onChange={this.onChange} 
type = 'text' placeholder='اسم المستخدم' max={25}/>
</div>
 <div>
 <input  className='add_account_input' type = 'password' name='room_password' onChange = {this.onChange} placeholder='كلمة المرور '/>
</div>                  
<div>

<div>
<select onChange = {this.onChange} name='room_id' className='add_account_input'  >
  {rooms.map(room => (
      <option value ={room._id} key = {key1 ++}>{room.name}</option>
  ))}

</select>
</div>



<select onClick = {this.onClick} className='add_account_input'>
    <option>master</option>
    <option>root</option>  
</select>

{user_type === 'root' ? 
<div>
    <label>تاريخ البداية</label>
<input type='date' onChange = {this.onChange} name = 'start_date' min = {new Date().toJSON().split('T')[0]}  className="login-input" placeholder="تاريخ الاشتراك"/>
<label>تاريخ الانتهاء</label>

<input type='date' onChange = {this.onChange} name = 'end_date' className="login-input" placeholder="تاريخ الانتهاء"/>
</div> : ''}


</div>
</div>
        

              {this.state.err || this.props.err.id === 'add account failed'?  <div className = 'alert alert-danger my-3 py-2'>{this.state.err || this.props.err.msg.msg}</div> : ''}
                
                {this.state.success && this.props.err.id !== 'add account failed'? <div className = 'alert alert-success my-3 py-2'>{this.state.success} </div> : ''}
              <div className="mt-4">
                             <button onClick = {this.onSave} className= 'btn btn-warning px-3 mx-3'>اضافة</button>
                              </div>                                

                         </div>
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}
const mapState = (state) => ({
    roomState: state.roomState,
    err: state.error
})
export default connect(mapState, {addUser, clearErrors}) (NewUser)