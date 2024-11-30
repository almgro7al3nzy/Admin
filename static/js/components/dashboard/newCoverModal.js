import React from "react";

import {Modal} from 'react-bootstrap'

import {connect} from 'react-redux' 

import {clearErrors} from '../../actions/errorActions'
import { addCover } from "../../actions/covers";
class NewFrameModal extends  React.Component{
    state = {
        name: '',
        file: null,
        success: false,
        err: false
    }

    onChange = (e) => {
        if (e.target.name === 'file') {
            // Handle file input
            this.setState({ file: e.target.files[0] });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    onClick = async () => {
        this.props.clearErrors();
        this.setState({ success: false, err: false });
        let { file } = this.state;

        if ( !file) {
            this.setState({ err: 'الرجاء ادخال جميع البيانات' });
        } else {
            // Create form data to send the file
            const formData = new FormData();
            formData.append('file', file);
            
            try {
                // Upload image to the server
                const response = await fetch('https://ertqa2.com/upload', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();

                if (response.ok) {
                    const url = data.filePath; // Assuming the server returns the image URL

                    // Call addFrame with the name and the image URL
                    let body = { url };
                    this.props.addCover(body);

                    this.setState({ success: 'تم اضافة الغلاف بنجاح' });
                } else {
                    this.setState({ err: 'Failed to upload image' });
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                this.setState({ err: 'An error occurred while uploading' });
            }
        }
    }
    render(){

        return(
            <div>

                <Modal show= {this.props.newCover} onHide = {this.props.handleNewCover}>
                    
                    <Modal.Body className="text-center">
                         <h5 className="mt-3">اضافة غلاف</h5>



                         <div className="mt-4">
                           

                           <input 
                                onChange={this.onChange} 
                                type="file" 
                                name='file' 
                                className="login-input" 
                                placeholder="Frame Image" 
                            />

                    

                             {this.state.err || this.props.error.id === 'add name failed' ? 
                             <p className="text-danger">{this.state.err || this.props.error.msg.msg}</p> : this.state.success ? 
                             <p className="text-success">{this.state.success}</p> : ''}

                          <div className="mt-4">
                             <button onClick={this.onClick} className= 'btn btn-warning px-3 mx-3'>اضافة</button>
                              </div>                  

                         </div>
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}


const mapState = (state) => ({

    error: state.error
})

export default connect(mapState, {addCover, clearErrors}) (NewFrameModal)
