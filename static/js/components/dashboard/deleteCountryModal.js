import React from "react";

import {Modal} from 'react-bootstrap'

class Delete extends  React.Component{
    render(){
        return(
            <div>

                <Modal show= {this.props.delete} onHide = {this.props.handleDelete}>
                    
                    <Modal.Body className="text-center">
                         <h5>سيتم حذف الدولة ({this.props.country_name})</h5>

                         <div className="mt-5">
                             <button className= 'btn btn-danger px-3 mx-3'
                             onClick = {this.props.onDeleteCountry}>تأكيد الحذف</button>
                             <button className= 'btn btn-light px-3 '
                             onClick={this.props.handleDelete }>الغاء</button>

                         </div>
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}

export default Delete