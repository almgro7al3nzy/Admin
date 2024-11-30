import React, { useState } from "react"

import { socket } from '../socket'
import axios from "axios"


export default function Support () {

    let [success , set_success] = useState(false)
    let [msg , set_msg] = useState('')

    let [success2 , set_success2] = useState(false)
    let [msg2 , set_msg2] = useState('')

    const onSend = () => {
        set_success(false)
      

        socket.emit('send-msg-public' , {text: msg})

        setTimeout(() => {
        set_success('تم ارسال رسالة عامة')
            
        }, 200);
    }
    const onChange = (e) => { set_msg(e.target.value) }


    const onSend2 = () => {
        set_success2(false)
         
        axios.post(`${process.env.REACT_APP_URL}/advert`, ({title: msg2}))
        setTimeout(() => {
            set_success2('تم ارسال الاعلان')
        }, 200);
    }
    const onChange2 = (e) => { set_msg2(e.target.value) }

    return(
        <div style ={{display: 'flex', justifyContent: 'center', alignItems: 'center' , marginTop: "50px"}}>
<div className="col-4 " >
<div  style ={{textAlign: 'center'}}>
<input name = 'text' className='add_account_input mx-auto' onChange ={onChange} style={{width: '350px', height: '150px'}} placeholder="رسالة عامة" />

</div>
{success?
<div className= 'text-center' style={{width: '250px', margin: 'auto'}}>
<p className='alert alert-success my-3 mx-auto' >{success}</p>

</div>                        :''}
<div className='text-center'>
 <button className='btn btn-info text-light my-3' onClick = {onSend} > ارسال رسالة عامة</button>
</div>
</div>


<div className="col-4">
    
<div style ={{textAlign: 'center'}}>
<input name = 'text' className='add_account_input mx-auto' onChange ={onChange2} style={{width: '350px', height: '150px'}} placeholder="الاعلانات " />

</div>
{success2?
<div className= 'text-center' style={{width: '250px', margin: 'auto'}}>
<p className='alert alert-success my-3 mx-auto' >{success2}</p>

</div>                        :''}
<div className='text-center'>
 <button className='btn btn-info text-light my-3' onClick = {onSend2} > ارسال اعلان</button>
</div>

</div>
        </div>
    )
}