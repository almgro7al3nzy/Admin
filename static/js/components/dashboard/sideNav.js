import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars} from '@fortawesome/free-solid-svg-icons'


class Nav extends React.Component{

      onClick = (selected) => {
         this.props.onSelect(selected)
     }
    render(){
       
        return(
            <div className="shadow text-center side-nav" style={{width:'250px', height: '100%', position: 'fixed',  background: 'linear-gradient(-120deg, #0d6efd, #0d6efd42)', color: 'white'}}>
                <div className="mt-3">

                    <FontAwesomeIcon className='side-icon mx-auto' icon ={faBars} onClick = {this.props.onClickNav}/>
                  <h3 id="brand" className="mt-3" >tok-chat</h3>

                  <hr/>

                  <div className="mt-4">
                  <h5 type='submit' onClick = {this.onClick.bind(this, 'countries')}  className="my-4">البلاد</h5>

                  <h5 type='submit' onClick = {this.onClick.bind(this, 'rooms')} className="my-4">الغرف</h5>
                  <h5 type='submit' onClick = {this.onClick.bind(this, 'names')}  className="my-4">الاسماء المسجلة</h5>
                  <h5 type='submit' onClick = {this.onClick.bind(this, 'names_special')}  className="my-4">الاسماء المميزة</h5>

                  <h5 type='submit' onClick = {this.onClick.bind(this, 'users')}  className="my-4">الروت و الماستر</h5>
                  <h5 type='submit' onClick = {this.onClick.bind(this, 'devices')}  className="my-4">بند السيرفر </h5>
                  <h5 type='submit' onClick = {this.onClick.bind(this, 'frames')}  className="my-4">الاطارات</h5>
                  <h5 type='submit' onClick = {this.onClick.bind(this, 'covers')}  className="my-4">الخلفيات</h5>


                  <h5 type='submit' onClick = {this.onClick.bind(this, 'support')}  className="my-4">قسم الدعم</h5>

                   
                  </div>


                  <hr/>
             
                  <h5  type='submit' className="my-4 btn btn-danger my-2 py-2 px-3" onClick={this.props.logout}>تسجيل الخروج</h5>
                  



                </div>
            </div>
        )
    }
}

export default Nav