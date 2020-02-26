import React, { Component } from 'react';
import Pets from './Pets';
import CreatePetModal from './CreatePetModal';
import ViewPet from './ViewPet';
import EditPet from './EditPet';
import axios from 'axios';

require('../App.css');

class PetContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			firstName: '',
			middleName: '',
			lastName: '',
			weight: '',
			age: '',
			peopleSkills: '',
			dogSkills: '',
			favTreat: '',
			favToy: '',
			favPlay: '',
			breed: '',
			fixed: '',
			owner: '',
			bio: '',
			sex: '',
			petPhoto: '',
			_id: '',
			addPet: false,
			pets: [],
			activePet: false,
			petViewModal: false,
			petToView: {
				firstName: '',
				middleName: '',
				lastName: '',
				weight: '',
				age: '',
				peopleSkills: '',
				dogSkills: '',
				favTreat: '',
				favToy: '',
				favPlay: '',
				breed: '',
				fixed: '',
				owner: '',
				bio: '',
				sex: '',
				petPhoto: '',
				_id: ''
			},
			editPetModal: false,
			selectedFile: null,
			petToEdit: {
				firstName: '',
				middleName: '',
				lastName: '',
				weight: '',
				age: '',
				peopleSkills: '',
				dogSkills: '',
				favTreat: '',
				favToy: '',
				favPlay: '',
				breed: '',
				fixed: '',
				owner: '',
				bio: '',
				sex: '',
				petPhoto: '',
				_id: ''
			},
			editPetId: ''
		}
	}
	getPet = async () => {
		const pet = await fetch(process.env.REACT_APP_URL + '/pet', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type':'application/json'
			}
		})
		const petParsedResponse = await pet.json();
		return petParsedResponse;
	}
	componentDidMount() {
		this.getPet().then(pet => {
			if(pet.status === 200) {
				let petArray = pet.data[0].pet
				this.setState({
					pets: petArray,
					activePet: true,
					username: pet.data[0].username
				})
			} else {
				this.setState({
					activePet:false
				})
			}
		})
	}
  	fileUploadHandler = async () => {
      const formData = new FormData();
      formData.append('petPhoto', this.state.selectedFile, this.state.selectedFile.name);
      formData.append('firstName', this.state.firstName);
      await axios.post(process.env.REACT_APP_URL + '/pet/new', formData, { withCredentials: true }).then(response => {
      	if(response.status === 200) {
      		this.setState({
      			pets: [...response.data.data.pet],
      			addPet: false
      		})
      	}
      })
    }
    handleSubmit = async (e) => {
      e.preventDefault();
      this.fileUploadHandler();
    }
	closeAddPetModal = () => {
		this.setState({
			addPet: false
		}) 
	}
	openAddPetModal = () => {
		this.setState({
			addPet: true
		})
	}
	viewPet = async (pet) => {
		try {
			const selectedPet = fetch(process.env.REACT_APP_URL + '/pet/' + pet._id, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type':'application/json'
				}
			})
			const petParsedResponse = await selectedPet.json();
			return petParsedResponse
		} catch(err) {
			console.error(err)
		}
	}
	openAndEditPet = (pet) => {
		this.setState({
			editPetModal: true,
			editPetId: pet._id,
			petToEdit: {
				...pet
			}
		})
		console.log(this.state.petToEdit);
	}
	closeAndUpdatePet = async () => {
		try {
			const formData = new FormData()
			if(this.state.selectedFile) {
				formData.append('firstName', this.state.petToEdit.firstName);
				formData.append('middleName', this.state.petToEdit.middleName);
				formData.append('lastName', this.state.petToEdit.lastName);
				formData.append('weight', this.state.petToEdit.weight);
				formData.append('age', this.state.petToEdit.age);
				formData.append('peopleSkills', this.state.petToEdit.peopleSkills);
				formData.append('dogSkills', this.state.petToEdit.dogSkills);
				formData.append('favToy', this.state.petToEdit.favToy);
				formData.append('favTreat', this.state.petToEdit.favTreat);
				formData.append('favPlay', this.state.petToEdit.favPlay);
				formData.append('breed', this.state.petToEdit.breed);
				formData.append('fixed', this.state.petToEdit.fixed);
				formData.append('owner', this.state.petToEdit.owner);
				formData.append('bio', this.state.petToEdit.bio);
				formData.append('sex', this.state.petToEdit.sex);
				formData.append('_id', this.state.petToEdit._id);
			} else {
				formData.append('firstName', this.state.petToEdit.firstName);
				formData.append('middleName', this.state.petToEdit.middleName);
				formData.append('lastName', this.state.petToEdit.lastName);
				formData.append('weight', this.state.petToEdit.weight);
				formData.append('age', this.state.petToEdit.age);
				formData.append('peopleSkills', this.state.petToEdit.peopleSkills);
				formData.append('dogSkills', this.state.petToEdit.dogSkills);
				formData.append('favToy', this.state.petToEdit.favToy);
				formData.append('favTreat', this.state.petToEdit.favTreat);
				formData.append('favPlay', this.state.petToEdit.favPlay);
				formData.append('breed', this.state.petToEdit.breed);
				formData.append('fixed', this.state.petToEdit.fixed);
				formData.append('owner', this.state.petToEdit.owner);
				formData.append('bio', this.state.petToEdit.bio);
				formData.append('sex', this.state.petToEdit.sex);
				formData.append('_id', this.state.petToEdit._id);
			}
			const editPet = await axios.put(process.env.REACT_APP_URL + '/pet/' + this.state.editPetId + '/update', formData, {withCredentials: true}, {
			}).then(response => {
				if(response.status === 200) {
	      			this.setState({
		      			pets: [...response.data.data.pet],
		      			editPetModal: false
      				})
      			}
			})
		} catch(err) {
			console.error(err)
		}
	}
	handlePutSubmit = async (e) => {
		e.preventDefault();
		this.closeAndUpdatePet();
		this.closeEditPetModal();
	}
	closeEditPetModal = () => {
		this.setState({
			editPetModal: false
		})
	}
	petViewToggle = (pet) => {
		if(!this.state.petViewModal) {
			this.setState({
				petViewModal: true,
				petToView: {
					...pet
				}
			})
		} else {
			this.setState({
				petViewModal: false
			})
		}
	}
	deletePet = async (id) => {
		try {
			const deletedPet = await fetch(process.env.REACT_APP_URL + '/pet/' + id + '/delete', {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type':'application/json'
				}
			})
			const parsedResponse = await deletedPet.json();
			let pets = parsedResponse.data.pet;
			this.setState({
				pets: pets
			})
		} catch(err) {
			console.error(err)
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	handlePetEditChange = (e) => {
		this.setState({
			petToEdit: {
				[e.currentTarget.name]: e.currentTarget.value
			}
		})
		console.log(this.state.petToEdit);
	}
    handleChange = (e) => {
	   this.setState({
	     [e.currentTarget.name]: e.currentTarget.value
	   });
	}
 	fileSelectHandler = (e) => {
    	this.setState({
        	selectedFile: e.target.files[0]
   		});
  	}
	render(){
		return (
			<div>
				<button className='btn-large grey lighten-1 blue-text text-darken-2 center-align' onClick={this.openAddPetModal}><i className="large material-icons right">pets</i>Add a Pet?</button>
				{!this.state.petViewModal && !this.state.editPetModal ? <Pets userInfo={this.props.userInfo} petInfo={this.state.pets} viewPet={this.petViewToggle} openAndEditPet={this.openAndEditPet} petViewModal={this.state.petViewModal} deletePet={this.deletePet} /> : null }
				<br/>
				<br/>
				<br/>
				{this.state.addPet ? <CreatePetModal handleChange={this.handleChange} fileSelectHandler={this.fileSelectHandler} handleSubmit={this.handleSubmit} fileUploadHandler={this.fileUploadHandler} getPet={this.getPet} closeAddPet={this.closeAddPetModal} openAddPet={this.openAddPetModal} pets={this.state.pets} addPet={this.state.addPet} /> : null}
				{this.state.petViewModal ? <ViewPet petViewToggle={this.petViewToggle} petToView={this.state.petToView} petViewModal={this.state.petViewModal} /> : null }
				{this.state.editPetModal ? <EditPet getPet={this.getPet} fileSelectHandler={this.fileSelectHandler} handleChange={this.handlePetEditChange} closeEditPetModal={this.closeEditPetModal} petToEdit={this.state.petToEdit} editPetModal={this.state.editPetModal} handleSubmit={this.handlePutSubmit} selectedFile={this.state.selectedFile} /> : null}
			</div>
		)
	}
}

export default PetContainer;