
import React from 'react'
import {connect} from 'react-redux'
import {admin_login} from '../../actions/user'
import {clearErrors} from '../../actions/errorActions'
class Login extends React.Component{

    state ={
       login : true
    }


    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onLogin = (e) => {

        this.props.clearErrors()
        let { name, password} = this.state
        
        let body ={name, password}
       this.props.admin_login(body)

    }

    render(){
     

        return(
            <div>
               
 <div className ='row m-0' style={{height: '100%', width: '100%', position: 'absolute'}}>

     
     
 <div className= 'col-12 col-md-6 text-light d-flex text-center pb-5' style={{background:'linear-gradient(to bottom, #db36a4, #f7ff00)', justifyContent: 'center' }}>
        <div style={{marginTop: '40%'}}>
        <h1 style={{fontWeight: 'bold', fontSize: '50px'}}>ERTQA2</h1>
        <hr/>
         <h4>tok-chat app Admin Dashboard .</h4>
        </div>
     </div>
     <div className='col-12 col-md-6 d-flex text-center' >
     <div className= 'card  mx-auto ' style={{border: 'none', width: '600px', maxWidth: '95%', borderRadius: '15px', background: '#ffffffab', zIndex: '2', marginTop: '30%'}}>
                   <div className= 'card-body text-center'>
                  

                  
                   
                    {/**login */}
                     <div>
                           
                    <h4 id='brand' style={{color: 'rgb(247 205 0)'}}>Ertqa2</h4>
                       <div className = 'mt-4'>
                           <input onChange = {this.onChange} name= 'name'  type = 'name' placeholder= 'email' className ='add_account_input' style={{width: '350px', height:'50px', maxWidth: '90%'}}/>
                       </div>

                       <div className = 'mt-4'>
                           <input onChange = {this.onChange} name='password'  type = 'password' placeholder= 'password' className = 'add_account_input' style={{width: '350px', height:'50px', maxWidth: '90%'}}/>
                       </div>

                       
<div>
    <p className = 'text-danger'>
        {this.props.error.id === 'login failed' ? 
        this.props.error.msg.msg  : ''}
    </p>
</div>

                      <div className =' mt-4'>
                      <button onClick = {this.onLogin} className = 'btn btn-success text-dark px-5' style={{height: '40px', width: '300px', maxWidth: '95%', borderRadius: '15px'}}>login</button>
                      </div>
                  

                     </div>

                     
                     

                   </div>
               </div>

              
     </div>


 </div>
              
                            
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error
})

export default connect(mapStateToProps, {clearErrors, admin_login})(Login)