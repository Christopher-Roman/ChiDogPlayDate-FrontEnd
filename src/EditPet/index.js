import React, { Component } from 'react';
import Modal from 'react-modal';
require('../App.css');


//Styles for Modal
const customStyles = {
  content : {
    backgroundColor: 'rgba(69,179,224)'
  }
};

// Allows Accessibility Reading
Modal.setAppElement('#root')

class EditPet extends Component {
	constructor(props) {
		super();
	}
	render() {
		return (
			<Modal
  			isOpen={this.props.editPetModal} 
  			style={customStyles}
  			onRequestClose={this.props.closeEditPetModal}>
                <form onSubmit={this.props.closeAndUpdatePet}>
                	<div className='pet-view-container'>
                		<div className='pet-info-container'>
    	            		<div className='photo-card'>
    	            			<div className='photo-container'>
    	            				<img alt='pet' src={`${process.env.REACT_APP_URL}/${this.props.petToEdit.petPhoto}`}/>
    	            			</div>
    	            		</div>
    	            		<br/>
    	            		<br/>
    	            		<div className='pet-bio-card'>
    	            			<div className='pet-bio-container'>
    		        				<label>{`${this.props.petToEdit.firstName}'s Story`}</label><br/>
    		        				<input name='bio' type='text' value={this.props.petToEdit.bio} onChange={this.props.handlePetToEditChange}></input><br/><br/>
    		        			</div>
    	        			</div>
    	        		</div>
                		<div className='pet-information-card'>
                			<div className='pet-information-container'>
                				<label>Name</label><br/>
                				<input name='firstName' type='text' value={this.props.petToEdit.firstName} onChange={this.props.handlePetToEditChange}></input><br/><br/>

                				<label>Middle Name</label><br/>
                				<input name='middleName' type='text' value={this.props.petToEdit.middleName} onChange={this.props.handlePetToEditChange}></input><br/><br/>

                				<label>Last Name</label><br/>
                				<input name='lastName' type='text' value={this.props.petToEdit.lastName} onChange={this.props.handlePetToEditChange}></input><br/><br/>

                				<label>Weight</label><br/>
                				<input name='weight' type='text' value={this.props.petToEdit.weight} onChange={this.props.handlePetToEditChange}></input><br/><br/>

                				<label>Age</label><br/>
                				<input name='age' type='text' value={this.props.petToEdit.age} onChange={this.props.handlePetToEditChange}></input><br/><br/>

                				<label>People Skills</label><br/>
                				<input name='peopleSkills' type='text' value={this.props.petToEdit.peopleSkills} onChange={this.props.handlePetToEditChange}></input><br/><br/>
                			</div>
                		</div>
                		<div className='pet-information-card'>
                			<div className='pet-information-container'>
                				<label>Dog Skills</label><br/>
                				<input name='dogSkills' type='text' value={this.props.petToEdit.dogSkills} onChange={this.props.handlePetToEditChange}></input><br/><br/>

                				<label>Favorite Treat</label><br/>
                				<input name='favTreat' type='text' value={this.props.petToEdit.favTreat} onChange={this.props.handlePetToEditChange}></input><br/><br/>

                				<label>Favorite Toy</label><br/>
                				<input name='favToy' type='text' value={this.props.petToEdit.favToy} onChange={this.props.handlePetToEditChange}></input><br/><br/>

                				<label>Breed</label><br/>
                				<input name='breed' type='text' value={this.props.petToEdit.breed} onChange={this.props.handlePetToEditChange}></input><br/><br/>

                				<label>Spayed/Neutered</label><br/>
                				<input name='fixed' type='text' value={this.props.petToEdit.fixed} onChange={this.props.handlePetToEditChange}></input><br/><br/>

                				<label>Male/Female</label><br/>
                				<input name='sex' type='text' value={this.props.petToEdit.sex} onChange={this.props.handlePetToEditChange}></input><br/><br/>
                				<button onClick={this.props.closeEditPetModal}>Close</button>
                			</div>
                		</div>
                	</div>
                    <button>Submit</button>
                </form>
          </Modal>
		)
	}
}

export default EditPet