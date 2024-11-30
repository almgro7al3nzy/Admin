import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'

import Delete from './deleteCoverModal'
import {connect} from 'react-redux'
import NewCoverModal from './newCoverModal'
import { deleteCover } from '../../actions/covers'
class Covers extends React.Component{

    state = {
        delete: false,
        newCover: false
    }

    handleDelete = (cover_id,) => {
        this.setState({delete : !this.state.delete, cover_id })
    }

    handleNewCover= () => {
        this.setState({newCover : !this.state.newCover})
    }

    onDeleteCover= () => {
        this.props.deleteCover(this.state.cover_id)
        this.handleDelete()
    }

    render(){

       

        let covers = this.props.coverState.covers || []

        return(
            <div className='mt-4 text-center' >
               <h4>الخلفيات</h4>

               <button onClick = {this.handleNewCover} className='btn px-2 shadow-sm' style={{background: '#fff6a9', border: '#fff6a9'}}> + اضافة غلاف </button>

               <div className='card shadow my-4 mx-auto' style={{maxWidth: '95%', width: '1300px', height: '500px', overflow: 'hidden', background: '#e8f4ff'}}>
                
                <div className='card-body' style={{overflow: 'auto'}}>
                <table className='' style={{minWidth: '100%', color: 'black'}}>

<thead className='mx-auto ' style={{ borderBottom: '.5px solid #ff5e00 ' }}>
    <tr>
     <th >الغلاف </th>
    </tr>
</thead>
<tbody  >

    {covers.map(cover=> (
        <tr id='report'>
        <td>
            <img src ={cover.url} className= 'my-2' width= '50' height = '50'/>
        </td>

        <td>
            <FontAwesomeIcon icon={faTrash} onClick={this.handleDelete.bind(this, cover._id,)} className='text-danger'/>
        </td>

    </tr>
    ))}



</tbody>



</table>

<Delete delete ={this.state.delete}
         cover_id = {this.state.cover_id}
         handleDelete = {this.handleDelete}
         onDeleteCover = {this.onDeleteCover}/> 

       <NewCoverModal newCover= {this.state.newCover}
       handleNewCover= {this.handleNewCover} 
       />         

                </div>
               </div>

               
            </div>
        )
    }
}


const mapState = (state) => ({
    coverState: state.coverState
})

export default connect(mapState, {deleteCover}) (Covers)