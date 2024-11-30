import React from "react";

import {Modal} from 'react-bootstrap'

import {connect} from 'react-redux'
import {addRoom} from '../../actions/room'

class NewRoom extends  React.Component{
    state = {
        country: 'education rooms',
        package_name: 'فضي'
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onAdd = () => {
        this.setState({success: false, err: false})
      let {name, package_name, start_date, end_date, owner, email, country , capacity , mobile , master, admin , super_admin  , member} = this.state

      if(name&&package_name&&start_date&& end_date&& owner&& email && country &&  capacity && mobile && master && admin && super_admin  && member){
          let body = {name, package_name, start_date, end_date, owner, email, country , capacity , mobile , master, admin , super_admin  , member}

          this.props.addRoom( body)
          this.setState({success: 'تم اضافة الغرفة بنجاح'})

      }else{
        this.setState({err: 'الرجاء ادخال جميع البيانات'})

      }
    }
    render(){

        let countries = this.props.roomState.countries || []


        return(
            <div>

                <Modal show= {this.props.newRoom} onHide = {this.props.handleNewRoom}>
                    
                    <Modal.Body className="text-center">
                         <h5>اضافة الغرفة </h5>



                         <div className="mt-5">
                           
                           <input onChange = {this.onChange} name = 'name' className="login-input" placeholder="اسم الغرفة"/>

                           <select onChange = {this.onChange} name = 'country' className = 'login-input'>
                           {countries.map(country => (
                               <option value = {country.name}>{country.name_ar}</option>
                           ))}
                           </select>

                           <input onChange = {this.onChange} name = 'owner' className="login-input" placeholder="اسم المالك"/>

                           <input onChange = {this.onChange} name = 'email' className="login-input" placeholder="الايميل"/>

                           <input onChange = {this.onChange} name = 'mobile' className="login-input" placeholder="الهاتف"/>


                           <hr/>

                           <select onChange = {this.onChange} name = 'package_name' className = 'login-input'>
                           <option value = 'فضي'>فضي</option>
                           <option value = 'مميز'>مميز</option>
                           <option value = 'ذهبي'>ذهبي</option>


                           </select>

                           <input onChange = {this.onChange} name = 'capacity' type = 'number' className="login-input" placeholder="السعة"/>
                           <input onChange = {this.onChange} name = 'master' type = 'number' className="login-input" placeholder="الماستر"/>
                           <input onChange = {this.onChange} name = 'admin' type = 'number' className="login-input" placeholder="الادمن"/>
                           <input onChange = {this.onChange} name = 'super_admin' type = 'number' className="login-input" placeholder="سوبر ادمن"/>

                           <input onChange = {this.onChange} name = 'member' type = 'number' className="login-input" placeholder="ممبر"/>


                           <input type='date' onChange = {this.onChange} name = 'start_date' min = {new Date().toJSON().split('T')[0]}  className="login-input" placeholder="تاريخ الاشتراك"/>

                           <input type='date' onChange = {this.onChange} name = 'end_date' className="login-input" placeholder="تاريخ الانتهاء"/>

                           {this.state.err ? 
                             <p className="text-danger">{this.state.err}</p> : ''}
 
                           {this.state.success ? 
                             <p className="text-success">{this.state.success}</p> : ''}

                          <div className="mt-4">
                             <button onClick = {this.onAdd} className= 'btn btn-warning px-3 mx-3'>اضافة</button>
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
})

export default connect(mapState, {addRoom}) (NewRoom)