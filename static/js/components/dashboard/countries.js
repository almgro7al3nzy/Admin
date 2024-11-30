import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'

import Delete from './deleteCountryModal'
import NewCountry from './newCountryModal'

import {connect} from 'react-redux'
import {editCountry, getCountry, deleteCountry, addCountry} from '../../actions/room'


class Countries extends React.Component{

    state = {
        delete: false,
        edit: false,
        newCountry: false
    }

    handleDelete = (country_id, country_name) => {
        this.setState({delete : !this.state.delete, country_id, country_name})
    }

    handleNewCountry= () => {
        this.setState({newCountry : !this.state.newCountry})
    }

    onDeleteCountry = () => {
        this.props.deleteCountry(this.state.country_id)
        this.handleDelete()
    }

    onAddCountry = (name, name_ar, url) => {


              let body = {name, name_ar, url}

              this.props.addCountry(body)

    }

    render(){

       

        let countries = this.props.roomState.countries || []

        return(
            <div className='mt-4 text-center' >
               <h4>البلاد</h4>

               <button onClick = {this.handleNewCountry} className='btn px-2 shadow-sm' style={{background: '#fff6a9', border: '#fff6a9'}}> + اضافة دولة </button>

               <div className='card shadow my-4 mx-auto' style={{maxWidth: '95%', width: '1300px', height: '500px', overflow: 'hidden', background: '#e8f4ff'}}>
                
                <div className='card-body' style={{overflow: 'auto'}}>
                <table className='' style={{minWidth: '100%', color: 'black'}}>

<thead className='mx-auto ' style={{ borderBottom: '.5px solid #ff5e00 ' }}>
    <tr>
     <th >البلد </th>
        <th >الاسم </th>
        <th >name </th>

        <th >عدد الغرف </th>

  
    </tr>
</thead>

<tbody  >

    {countries.map(country => (
        <tr id='report'>
        <td>
            <img src ={country.url} className= 'my-2' width= '50' height = '50'/>
        </td>
        <td>{country.name_ar}</td>

        <td>{country.name}</td>
        <td>{country.rooms}</td>
     

     
        

        <td>
            <FontAwesomeIcon icon={faTrash} onClick={this.handleDelete.bind(this, country._id, country.name_ar)} className='text-danger'/>
        </td>

    </tr>
    ))}



</tbody>



</table>

<Delete delete ={this.state.delete}
        country_name = {this.state.country_name}
         country_id = {this.state.country_id}
         handleDelete = {this.handleDelete}
         onDeleteCountry = {this.onDeleteCountry}/> 

       <NewCountry newCountry= {this.state.newCountry}
       handleNewCountry= {this.handleNewCountry} 
       onAddCountry ={this.onAddCountry}/>         

                </div>
               </div>

               
            </div>
        )
    }
}


const mapState = (state) => ({
    roomState: state.roomState
})

export default connect(mapState, {getCountry, editCountry, deleteCountry, addCountry}) (Countries)