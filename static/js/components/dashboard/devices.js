import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'



import {connect} from 'react-redux'
import {deleteDevice} from '../../actions/DEVICES'

class Devices extends React.Component{


    render(){

        let all = this.props.deviceState.devices || []
        let devices = all.filter(d => d.room === 'all') || []

        return(
            <div className = 'text-center'>

                <h5>الاجهزة المحظورة</h5>

                <div className='card shadow my-4 mx-auto' style={{maxWidth: '95%', width: '1300px', height: '500px', overflow: 'hidden',background: '#e8f4ff'}}>
                
                <div className='card-body' style={{overflow: 'auto'}}>
                <table className='' style={{minWidth: '100%', color: 'black'}}>

<thead className='mx-auto ' style={{ borderBottom: '.5px solid #ff5e00 ' }}>
    <tr>
     <th >ip </th>
     <th>الاسم</th>
     <th>البلد</th>
        <th >محظور من </th>
        <th >تاريخ الحظر </th>

  
    </tr>
</thead>

<tbody  >

    {devices.map(d => (
        <tr id='report'>
     
     

        <td>{d.ip}</td>
        <td>{d.name}</td>
        <td>{d.country}</td>

        <td>{d.blocked_by}</td>
         
        <td>{d.blocked_date.substring(0 ,10)}</td>

     
        

        <td>
            <FontAwesomeIcon icon={faTrash} onClick={() => this.props.deleteDevice(d._id)} className='text-danger'/>
        </td>

    </tr>
    ))}



</tbody>



</table>

</div>

</div>



            </div>
        )
    }
}

const mapState = (state) => ({
    deviceState: state.deviceState
})

export default connect(mapState, {deleteDevice}) (Devices)