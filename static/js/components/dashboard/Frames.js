import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'

import Delete from './deleteFrame'
import {connect} from 'react-redux'
import NewFrameModal from './newFrameModal'
import { deleteFrame } from '../../actions/frames'

class Frames extends React.Component{

    state = {
        delete: false,
        newframe: false
    }

    handleDelete = (frame_id, frame_name) => {
        this.setState({delete : !this.state.delete, frame_id , frame_name})
    }

    handleNewFrame= () => {
        this.setState({newframe : !this.state.newframe})
    }

    onDeleteFrame = () => {
        this.props.deleteFrame(this.state.frame_id)
        this.handleDelete()
    }

    onAddFrame = (name,  url) => {
              let body = {name,  url}
              this.props.addCountry(body)

    }

    render(){

       

        let frames = this.props.frameState.frames || []

        return(
            <div className='mt-4 text-center' >
               <h4>الإطارات</h4>

               <button onClick = {this.handleNewFrame} className='btn px-2 shadow-sm' style={{background: '#fff6a9', border: '#fff6a9'}}> + اضافة إطار </button>

               <div className='card shadow my-4 mx-auto' style={{maxWidth: '95%', width: '1300px', height: '500px', overflow: 'hidden', background: '#e8f4ff'}}>
                
                <div className='card-body' style={{overflow: 'auto'}}>
                <table className='' style={{minWidth: '100%', color: 'black'}}>

<thead className='mx-auto ' style={{ borderBottom: '.5px solid #ff5e00 ' }}>
    <tr>
     <th >الإطار </th>
        <th >اسم الإطار </th>
    </tr>
</thead>
<tbody  >

    {frames.map(frame => (
        <tr id='report'>
        <td>
            <img src ={frame.url} className= 'my-2' width= '50' height = '50'/>
        </td>
        <td>{frame.name}</td>

        <td>
            <FontAwesomeIcon icon={faTrash} onClick={this.handleDelete.bind(this, frame._id, frame.name)} className='text-danger'/>
        </td>

    </tr>
    ))}



</tbody>



</table>

<Delete delete ={this.state.delete}
        frame_name = {this.state.frame_name}
         frame_id = {this.state.frame_id}
         handleDelete = {this.handleDelete}
         onDeleteFrame = {this.onDeleteFrame}/> 

       <NewFrameModal newframe= {this.state.newframe}
       handleNewFrame= {this.handleNewFrame} 
       />         

                </div>
               </div>

               
            </div>
        )
    }
}


const mapState = (state) => ({
    frameState: state.frameState
})

export default connect(mapState, {deleteFrame}) (Frames)