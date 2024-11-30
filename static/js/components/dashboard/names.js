import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'

import Delete from './deleteNameModal'
import Edit from './editNameModal'
import NewName from './newNameModal'

import {connect} from 'react-redux'

import {deleteName} from '../../actions/namesActions'
class Names extends React.Component{

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

    handleEdit= (id, name) => {
        if(!this.state.edit){
            this.setState({id, name})
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
        this.props.deleteName(this.state.name_id)
    }
    render(){

        let names = this.props.nameState.names || []

        return(
            <div className='mt-4 text-center'>
               <h4>الاسماء المسجلة</h4>

               <button onClick = {this.handleNewName} className='btn px-2 shadow-sm' style={{background: '#fff6a9', border: '#fff6a9'}}> + اسم جديد </button>

               <div className='card shadow my-4 mx-auto' style={{maxWidth: '95%', width: '1300px', height: '500px', overflow: 'hidden', background: '#e8f4ff'}}>
                
                <div className='card-body' style={{overflow: 'auto'}}>
                <table className='' style={{minWidth: '95%', color: 'black'}}>

<thead className='mx-auto ' style={{ borderBottom: '.5px solid #ff5e00 ' }}>
    <tr>
     <th >الاسم </th>
        <th >النوع </th>
        <th >تاريخ التسجيل </th>

        <th >تاريخ الانتهاء</th>
  
    </tr>
</thead>

<tbody  >

   {names.map(n => (
        <tr id='report'>
        <td>{n.name}</td>
        <td>{n.name_type === 'protected' ? 'محمي' :n.name_type === 'royal'? 'ملكي': "-"}</td>

        <td>{this.getDate(n.start_date)}</td>
        <td>{this.getDate(n.end_date)}</td>
   

     
        <td>
            <FontAwesomeIcon icon={faEdit}  onClick={this.handleEdit.bind(this, n._id, n.name)} className='text-success'/>
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
       handleEdit= {this.handleEdit} />   

       <NewName NewName= {this.state.NewName}
       handleNewName= {this.handleNewName} />         

                </div>
               </div>

               
            </div>
        )
    }
}

const mapState = (state) => ({
    nameState: state.nameState
})

export default connect(mapState, {deleteName}) (Names)