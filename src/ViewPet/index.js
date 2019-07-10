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

class ViewPet extends Component {
	constructor() {
		super();
		this.state = {
			// _id: this.props.petToView.id
		}
	}
	render() {
		return (
			<Modal
  			isOpen={this.props.petViewModal} 
  			style={customStyles}
  			onRequestClose={this.props.petViewToggle}>
            	<div className='pet-view-container'>
            		<div className='pet-info-container'>
	            		<div className='photo-card'>
	            			<div className='photo-container'>
	            				<img alt='pet' src={`${process.env.REACT_APP_URL}/${this.props.petToView.petPhoto}`}/>
                                <input type="file" name="petPhoto" onChange={this.fileSelectHandler} ref={fileInput => this.fileInput = fileInput} />
	            			</div>
	            		</div>
	            		<br/>
	            		<br/>
	            		<div className='pet-bio-card'>
	            			<div className='pet-bio-container'>
		        				<label>{`${this.props.petToView.firstName}'s Story`}</label><br/>
		        				<span>{this.props.petToView.bio}</span><br/><br/>
		        			</div>
	        			</div>
	        		</div>
            		<div className='pet-information-card'>
            			<div className='pet-information-container'>
            				<label>Name</label><br/>
            				<span>{this.props.petToView.firstName}</span><br/><br/>

            				<label>Middle Name</label><br/>
            				<span>{this.props.petToView.middleName}</span><br/><br/>

            				<label>Last Name</label><br/>
            				<span>{this.props.petToView.lastName}</span><br/><br/>

            				<label>Weight</label><br/>
            				<span>{this.props.petToView.weight}</span><br/><br/>

            				<label>Age</label><br/>
            				<span>{this.props.petToView.age}</span><br/><br/>

            				<label>People Skills</label><br/>
            				<span>{this.props.petToView.peopleSkills}</span><br/><br/>
            			</div>
            		</div>
            		<div className='pet-information-card'>
            			<div className='pet-information-container'>
            				<label>Dog Skills</label><br/>
            				<span>{this.props.petToView.dogSkills}</span><br/><br/>

            				<label>Favorite Treat</label><br/>
            				<span>{this.props.petToView.favTreat}</span><br/><br/>

            				<label>Favorite Toy</label><br/>
            				<span>{this.props.petToView.favToy}</span><br/><br/>

            				<label>Breed</label><br/>
            				<span>{this.props.petToView.breed}</span><br/><br/>

            				<label>Spayed/Neutered</label><br/>
            				<span>{this.props.petToView.fixed}</span><br/><br/>

            				<label>Male/Female</label><br/>
            				<span>{this.props.petToView.sex}</span><br/><br/>
            				<button onClick={this.props.petViewToggle}>Close</button>
            			</div>
            		</div>
            	</div>
          </Modal>
		)
	}
}

export default ViewPet