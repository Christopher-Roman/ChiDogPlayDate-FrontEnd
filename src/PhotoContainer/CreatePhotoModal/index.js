import React, { Component } from 'react';
import Modal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor		  : '#455a64'
  }
};

// Allows Accessibility Reading
Modal.setAppElement('#root')

class CreatePhotoModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFile: props.selectedFile
		}
	}
	render() {
	  	return (
	  		<Modal
				isOpen={this.props.addPhoto} 
				style={customStyles}
				onRequestClose={this.props.closeAddPet}>
	        	<div>Add a Photo!</div>
	        	<br/>
	        	<form onSubmit={this.props.handlePostSubmit}>
	        		<label>Photo Caption</label>
	        		<br/>
		            <input name='description' type='text' onChange={this.props.handleChange} />
		            <br/>
		            <label>Pet Photo</label>
		            <br/>
		            <input type="file" name="photoUrl" onChange={this.props.fileSelectHandler} ref={fileInput => this.fileInput = fileInput} />
	            <button>Submit</button>
	        	</form>
	        	<button onClick={this.props.addPhotoClose}>close</button>
	        </Modal>
	    )
	}
}

export default CreatePhotoModal;

