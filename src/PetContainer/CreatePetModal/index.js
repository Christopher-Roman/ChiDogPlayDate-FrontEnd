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
    backgroundColor		    : '#455a64'
  }
};

// Allows Accessibility Reading
Modal.setAppElement('#root')

class CreatePetModal extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedFile: null
    }
  }
  render() {
  	return (
  		<Modal
  			isOpen={this.props.addPet} 
  			style={customStyles}
  			onRequestClose={this.props.closeAddPet}>
            	<div>Add a pet!</div>
            	<br/>
            	<form onSubmit={this.props.handleSubmit}>
            		<label>Pet Name</label>
            		<br/>
  	            <input name='firstName' type='text' onChange={this.props.handleChange} />
  	            <br/>
  	            <label>Pet Photo</label>
  	            <br/>
  	            <input type="file" name="petPhoto" onChange={this.props.fileSelectHandler} ref={fileInput => this.fileInput = fileInput} />
                <button>Submit</button>
            	</form>
            	<button onClick={this.props.closeAddPet}>close</button>
          </Modal>
      )
  }
}

export default CreatePetModal;