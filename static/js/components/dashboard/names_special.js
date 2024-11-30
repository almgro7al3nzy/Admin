import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'

import Delete from './deleteNameModal'
import Edit from './editNameModal'
import NewName from './newNameModal'

import {connect} from 'react-redux'

import {deleteName} from '../../actions/namesActions'

class Special extends React.Component{

    state = {
        delete: false,
        edit: false,
        NewName: false
    }

    handleDelete = (name , name_id) => {
        if(!this.state.delete){
            this.setState({name, name_id})
        }

        this.setState({delete : !this.state.delete})
    }

    handleEdit= (id, name, color) => {
        if(!this.state.edit){
            this.setState({id, name, color})
        }
        this.setState({edit : !this.state.edit})
    }

    handleNewName= () => {
        this.setState({NewName : !this.state.NewName})
    }

     getDate = (date) => {
        let date_  = new Date(date)
        return date_.toLocaleDateString()
    }

    onDelete = () => {
        let type = 'special'
        this.props.deleteName(this.state.name_id, type)
    }
    render(){

        let key = 1

        let all_names = this.props.nameState.names || []
        let names= all_names.filter(n => n.program_owner)

        return(
            <div className='mt-4 text-center'>
               <h4>الاسماء المميزة</h4>

               <button onClick = {this.handleNewName} className='btn px-2 shadow-sm' style={{background: '#fff6a9', border: '#fff6a9'}}> + اسم جديد </button>

               <div className='card shadow my-4 mx-auto' style={{maxWidth: '95%', width: '1300px', height: '500px', overflow: 'hidden' , background: '#e8f4ff'}}>
                
                <div className='card-body' style={{overflow: 'auto'}}>
                <table className='' style={{minWidth: '95%', color: 'black'}}>

<thead className='mx-auto ' style={{ borderBottom: '.5px solid #ff5e00 ' }}>
    <tr>
     <th >الاسم </th>
   
        <th >تاريخ الانشاء </th>
        <th >تعديل</th>

        <th >حذف</th>

  
    </tr>
</thead>

<tbody  >

   {names.map(n => (
        <tr id='report'>
        <td >

            <span style={{color: `${n.color}`}}>{n.name }</span>
            
            </td>


        <td>{this.getDate(n.start_date)}</td>
     
   

     
        <td>
            <FontAwesomeIcon icon={faEdit}  onClick={this.handleEdit.bind(this, n._id, n.name, n.color)} className='text-success'/>
        </td>

        <td>
            <FontAwesomeIcon icon={faTrash}  onClick={this.handleDelete.bind(this, n.name, n._id)} className='text-danger'/>
        </td>

    </tr>
   ))}



</tbody>



</table>

<Delete delete ={this.state.delete}
         name = {this.state.name}
         name_id = {this.state.name_id}
         handleDelete = {this.handleDelete}
         onDelete = {this.onDelete}/>

<Edit edit= {this.state.edit}
       name = {this.state.name}
       id = {this.state.id}
       handleEdit= {this.handleEdit} 
       owner = {true} 
       color = {this.state.color}/>   

       <NewName NewName= {this.state.NewName}
       handleNewName= {this.handleNewName}
       owner = {true} />         

                </div>
               </div>

               
            </div>
        )
    }
}

const mapState = (state) => ({
    nameState: state.nameState
})

export default connect(mapState, {deleteName}) (Special)