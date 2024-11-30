import React from "react";

import {Modal} from 'react-bootstrap'

import {connect} from 'react-redux'
import {updateUser, getUser} from '../../actions/user'

class Edit extends  React.Component{
    state ={}


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



    onSave = () => {
        this.setState({err: false, success: false})

        const {name , room_password, start_date, end_date} = this.state
        const body = { 
            name,
                      room_password,
                      start_date, 
                      end_date
                      , edited_by: true
                     }
        let id = this.props.user._id
  
            this.props.updateUser(id, body)
            this.setState({success: 'تم تعديل العضو بنجاح'})
        
    }


    render(){

        let user = this.props.user || ''


        return(
            <div>

                <Modal show= {this.props.edit} onHide = {this.props.handleEdit}>
                    
                    <Modal.Body className="text-center">
                         <h5 className="mt-3">تعديل المستخدم {this.props.user_name}</h5>



                         <div className="mt-4">


                         <div>

<div>
<input  className='add_account_input'  name = 'name' onChange={this.onChange} 
type = 'text' placeholder={user.name}  />
</div>
 <div>
 <input  className='add_account_input' type = 'password' name='room_password' onChange = {this.onChange} placeholder='كلمة المرور '/>
</div>                  
<div>

{user.type === 'root' ? 
<div>
    <label>تاريخ البداية</label>
<input type='date' onChange = {this.onChange} name = 'start_date' min = {new Date().toJSON().split('T')[0]}  className="login-input" placeholder="تاريخ الاشتراك"/>
<label>تاريخ الانتهاء</label>

<input type='date' onChange = {this.onChange} name = 'end_date' className="login-input" placeholder="تاريخ الانتهاء"/>
</div> : ''}



</div>
</div>

              {this.state.err ?  <div className = 'alert-danger my-3 py-2'>{this.state.err}</div> : ''}
                
                {this.state.success ? <div className = 'alert-success my-3 py-2'>{this.state.success} </div> : ''}

              <div className="mt-4">
                             <button onClick ={this.onSave} className= 'btn btn-warning px-3 mx-3'>تعديل</button>
                              </div>                  
                           
                           
                         </div>
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}
const mapState =(state) => ({
    user: state.userState.user
})

export default connect(mapState , {updateUser, getUser}) (Edit)