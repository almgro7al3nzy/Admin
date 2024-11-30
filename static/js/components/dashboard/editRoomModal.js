import React from "react";

import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'

import {editRoom, getAllRooms} from '../../actions/room'

class Edit extends  React.Component{

    state = {} 

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onEdit = (id) => {
      let {name, package_name, start_date, end_date, owner, email, country,  capacity , mobile , master, admin , super_admin  , member} = this.state

      if(name||package_name||start_date|| end_date|| owner|| email || country ||  capacity || mobile || master || admin || super_admin  || member){
          let body = {name, package_name, start_date, end_date, owner, email , country,  capacity , mobile , master, admin , super_admin  , member}

          this.props.editRoom(id, body)
          this.setState({success: 'تم تعديل الغرفة بنجاح'})
setTimeout(() => {
    this.props.getAllRooms()
    
}, 500);

      }
    }
    render(){

        let room= this.props.roomState.room || {}
        let countries = this.props.roomState.countries || []

         let packages = this.props.packageState.packages || []

        return(
            <div>

                <Modal show= {this.props.edit} onHide = {this.props.handleEdit}>
                    
                    <Modal.Body className="text-center">
                         <h5>تعديل الغرفة {this.props.room_name}</h5>



                         <div className="mt-5">
                           <div>
                               <label>اسم الغرفة</label>
                           </div>
                           <input onChange ={this.onChange} name='name' className="login-input" placeholder={room.name}/>

                           <select className = 'login-input'  onChange ={this.onChange} name='country'>
                           {countries.map(country => (
                               <option value ={country.name}>{country.name_ar}</option>
                           ))}
                           </select>

                           <div>
                               <label>اسم المالك</label>
                           </div>
                           
                           <input onChange ={this.onChange} name='owner' className="login-input" placeholder={room.owner}/>
                            
                           <div>
                               <label>الايميل </label>
                           </div>

                           <input onChange ={this.onChange} name='email' className="login-input" placeholder={room.email}/>

                           <div>
                               <label>الهاتف </label>
                           </div>

                           <input onChange ={this.onChange} name='mobile' className="login-input" placeholder={room.mobile}/>

                           <hr/>

                           <select className = 'login-input' onChange ={this.onChange} name='package_name'>
                           <option value = 'فضي' selected ={room.package_name === 'فضي'}>فضي</option>
                           <option value = 'مميز' selected ={room.package_name === 'مميز'}>مميز</option>
                           <option value = 'ذهبي' selected ={room.package_name === 'ذهبي'}>ذهبي</option>

                           </select>

                                 
                           <div>
                               <label>السعة </label>
                           </div>
                           <input onChange = {this.onChange} name = 'capacity' type = 'number' className="login-input" placeholder={room.capacity}/>
                                
                           <div>
                               <label>الماستر </label>
                           </div>
                           <input onChange = {this.onChange} name = 'master' type = 'number' className="login-input" placeholder="الماستر"/>
                                
                           <div>
                               <label>الادمن </label>
                           </div>
                           <input onChange = {this.onChange} name = 'admin' type = 'number' className="login-input" placeholder="الادمن"/>
                                
                           <div>
                               <label>سوبر ادمن </label>
                           </div>
                           <input onChange = {this.onChange} name = 'super_admin' type = 'number' className="login-input" placeholder="سوبر ادمن"/>
                                
                           <div>
                               <label>ممبر </label>
                           </div>

                           <input onChange = {this.onChange} name = 'member' type = 'number' className="login-input" placeholder="ممبر"/>


                           <div>
                               <label>تاريخ الاشتراك </label>
                           </div>

                           <input onChange ={this.onChange} name='start_date' type= 'date' className="login-input" />

                           <div>
                               <label>تاريخ الانتهاء </label>
                           </div>
                           <input type='date' onChange ={this.onChange} name='end_date' className="login-input" />


                           {this.state.success ? 
                             <p className="text-success">{this.state.success}</p> : ''}


                          <div className="mt-4">
                             <button onClick = {this.onEdit.bind(this, room._id)} className= 'btn btn-warning px-3 mx-3'>تعديل</button>
                              </div>                  

                         </div>

                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}

const mapState =(state) =>({
    roomState: state.roomState,
    packageState: state.packageState
})

export default connect(mapState, {editRoom, getAllRooms}) (Edit)
