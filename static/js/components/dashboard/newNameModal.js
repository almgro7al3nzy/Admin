import React from "react";

import {Modal} from 'react-bootstrap'

import {connect} from 'react-redux' 

import {addName} from '../../actions/namesActions'
import {clearErrors} from '../../actions/errorActions'

class NewNameModal extends  React.Component{

    state ={ name_type: 'royal', color: '#0000ff' }

  
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onClick = () => {

        this.props.clearErrors()
        this.setState({success: false, err: false})
        let {name, password,  start_date, end_date, name_type , frame} = this.state
        
        if(this.props.owner){
            let start_date = new Date()

            if(!name || !password    ){
                this.setState({err: 'الرجاء ادخال جميع البيانات'})
            }else{
                let body ={name, password, start_date,  owner: true , frame}
                this.props.addName(body)
    
                setTimeout(() => {
                this.setState({success: 'تم اضافة الاسم بنجاح'})
                    
                }, 500);
            }
        }else{

             if(!name || !password || !start_date || !end_date ){
                this.setState({err: 'الرجاء ادخال جميع البيانات'})
            }else{
                let body ={name, password, start_date, end_date, name_type, owner: false , frame}
                this.props.addName(body)
    
                setTimeout(() => {
                this.setState({success: 'تم اضافة الاسم بنجاح'})
                    
                }, 500);
            }

        }
    }
    render(){

        let frames = this.props.frameState.frames
        

        return(
            <div>

                <Modal show= {this.props.NewName} onHide = {this.props.handleNewName}>
                    
                    <Modal.Body className="text-center">
                         <h5 className="mt-3">اضافة اسم</h5>



                         <div className="mt-4">
                           
                           <input onChange={this.onChange} name ='name' className="login-input" placeholder="الاسم"/>

                    
                           <input onChange={this.onChange} name ='password' className="login-input" placeholder="الباسوورد"/>


                           {this.props.owner ? 
                           <div>
 
                           </div>

                           : 
                           <div>
                               <select onChange={this.onChange} name ='name_type' className="login-input" placeholder="نوع">
                               <option value="royal">ملكي</option>
                               <option value="protected">محمي</option>

                           </select>

                           <select 
                                onChange={this.onChange} 
                                name='frame' 
                                className="login-input" 
                                placeholder="Select Frame Name"
                            >
                              <option value=""> اختيار اطار</option> 
                                {frames.map((frame, index) => (
                                    <option key={index} value={frame.url}>
                                        {frame.name}
                                    </option>
                                ))}
                                 
                            </select>

                           <input type='date' onChange={this.onChange} name ='start_date' className="login-input" placeholder="تاريخ الاشتراك"/>


                           <input type='date' onChange={this.onChange} name ='end_date' className="login-input" placeholder="تاريخ الانتهاء"/>
                           </div>
                           }

                           
                    

                             {this.state.err || this.props.error.id === 'add name failed' ? 
                             <p className="text-danger">{this.state.err || this.props.error.msg.msg}</p> : this.state.success ? 
                             <p className="text-success">{this.state.success}</p> : ''}

                          <div className="mt-4">
                             <button onClick={this.onClick} className= 'btn btn-warning px-3 mx-3'>اضافة</button>
                              </div>                  

                         </div>
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}


const mapState = (state) => ({
frameState: state.frameState,
    error: state.error
})

export default connect(mapState, {addName, clearErrors}) (NewNameModal)