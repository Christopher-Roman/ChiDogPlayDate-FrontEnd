import React from 'react';
import Modal from 'react-modal'

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

const CreatePetModal = (props) => {
	return (
		<Modal
			isOpen={props.addPet} 
			style={customStyles}
			onRequestClose={props.closeAddPet}>
          	<div>Create a new Budget!</div>
          	<br/>
          	<form onSubmit={props.newPet}>
          		<label>Pet Name</label>
          		<br/>
	            <input name='firstName' type='text' onChange={props.handleChange} />
	            <br/>
	            <label>Age</label>
	            <br/>
	            <input name='age' type='text' onChange={props.handleChange} />
          		<br/>
          		<button>Submit</button>
          	</form>
          	<button onClick={props.closeAddPet}>close</button>
        </Modal>
    )
}

export default CreatePetModal;