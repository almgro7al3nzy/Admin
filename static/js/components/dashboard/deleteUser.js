import React from "react";

import {Modal} from 'react-bootstrap'

class Delete extends  React.Component{
    render(){
        return(
            <div>

                <Modal show= {this.props.delete} onHide = {this.props.handleDelete}>
                    
                    <Modal.Body className="text-center">
                         <h5>سيتم حذف المستخدم ({this.props.user_name})</h5>

                         <div className="mt-5">
                             <button onClick ={this.props.onDelete} className= 'btn btn-danger px-3 mx-3'>تأكيد الحذف</button>
                             <button  onClick = {this.props.handleDelete} className= 'btn btn-light px-3 '>الغاء</button>

                         </div>
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}

export default Delete