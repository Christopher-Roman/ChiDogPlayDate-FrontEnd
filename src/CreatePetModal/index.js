import React, { Component } from 'react';
import Modal from 'react-modal'
import axios from 'axios';

//*****************************************//
//                                         //
//    View of specifically selected        //
//    budget listed within the             //
//    BudgetContainer in order to edit     //
//    the selected budget. Conditional     //
//    rendering in BudgetContainer.        //
//                                         //
//*****************************************//

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor		  : 'rgba(69,179,224)'
  }
};

// Allows Accessibility Reading
Modal.setAppElement('#root')

class CreatePetModal extends Component {
  constructor(props) {
    super();
    this.state = {
      firstName: '',
      selectedFile: null,
      uploadProgress: ''
    }
  }
  fileSelectHandler = (e) => {
    this.setState({
        selectedFile: e.target.files[0]
    });
  }
  fileUploadHandler = async () => {
      const formData = new FormData();
      formData.append('petPhoto', this.state.selectedFile, this.state.selectedFile.name);
      formData.append('firstName', this.state.firstName);
      await axios.post(process.env.REACT_APP_URL + '/pet/new', formData, { withCredentials: true }, {
        onUploadProgress: progressEvent => {
          console.log('Upload Progress: ' + Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%')
        }
      })
    }
    handleSubmit = async (e) => {
      e.preventDefault();
      this.fileUploadHandler();
      this.props.closeAddPet()
    }
    handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  render() {
  	return (
  		<Modal
  			isOpen={this.props.addPet} 
  			style={customStyles}
  			onRequestClose={this.props.closeAddPet}>
            	<div>Add a pet!</div>
            	<br/>
            	<form onSubmit={this.handleSubmit}>
            		<label>Pet Name</label>
            		<br/>
  	            <input name='firstName' type='text' onChange={this.handleChange} />
  	            <br/>
  	            <label>Age</label>
  	            <br/>
  	            <input type="file" name="img" onChange={this.fileSelectHandler} ref={fileInput => this.fileInput = fileInput} />
                <h3>{ this.state.uploadProgress }</h3>
                <button>Submit</button>
            	</form>
            	<button onClick={this.props.closeAddPet}>close</button>
          </Modal>
      )
  }
}

export default CreatePetModal;