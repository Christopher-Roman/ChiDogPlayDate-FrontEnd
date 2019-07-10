import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

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
        super(props);
        this.state= {
            _id: this.props.petToEdit._id,
            selectedFile: null,
            firstName: this.props.petToEdit.firstName,
            middleName: this.props.petToEdit.middleName,
            lastName: this.props.petToEdit.lastName,
            weight: this.props.petToEdit.weight,
            age: this.props.petToEdit.age,
            peopleSkills: this.props.petToEdit.peopleSkills,
            dogSkills: this.props.petToEdit.dogSkills,
            favTreat: this.props.petToEdit.favTreat,
            favToy: this.props.petToEdit.favToy,
            favPlay: this.props.petToEdit.favPlay,
            breed: this.props.petToEdit.breed,
            fixed: this.props.petToEdit.fixed,
            bio: this.props.petToEdit.bio,
            sex: this.props.petToEdit.sex
        }
    }
    fileSelectHandler = async (e) => {
        await this.setState({
            selectedFile: e.target.files[0]
        });
        console.log(this.state.selectedFile);
    }
    closeAndUpdatePet = async () => {
        try {
            const formData = new FormData();
            formData.append('petPhoto', this.state.selectedFile, this.state.selectedFile.name);
            formData.append('bio', this.state.bio);
            formData.append('firstName', this.state.firstName);
            formData.append('middleName', this.state.middleName);
            formData.append('lastName', this.state.lastName);
            formData.append('weight', this.state.weight);
            formData.append('age', this.state.age);
            formData.append('peopleSkills', this.state.peopleSkills);
            formData.append('dogSkills', this.state.dogSkills);
            formData.append('favTreat', this.state.favTreat);
            formData.append('favToy', this.state.favToy);
            formData.append('breed', this.state.breed);
            formData.append('fixed', this.state.fixed);
            formData.append('sex', this.state.sex);
            formData.append('_id', this.state._id);
            const editPet = await axios.put(process.env.REACT_APP_URL + '/pet/' + this.state._id + '/update', formData, { withCredentials: true }, {
            }).then(response => {
                return response.data
            })
        } catch(err) {
            console.error(err)
        }
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        this.closeAndUpdatePet();
        this.props.closeEditPetModal();
        this.props.getPet();
    }
    handleChange = async (e) => {
        await this.setState({
          [e.currentTarget.name]: e.currentTarget.value
        })
        console.log(this.state);
    }
    render() {
        return (
            <Modal
            isOpen={this.props.editPetModal} 
            style={customStyles}
            onRequestClose={this.props.closeEditPetModal}>
                <form onSubmit={this.handleSubmit}>
                    <div className='pet-view-container'>
                        <div className='pet-info-container'>
                            <div className='photo-card'>
                                <div className='photo-container'>
                                    <img alt='pet' src={`${process.env.REACT_APP_URL}/${this.props.petToEdit.petPhoto}`}/>
                                </div>
                                <input type="file" name="petPhoto" onChange={this.fileSelectHandler} ref={fileInput => this.fileInput = fileInput} />
                            </div>
                            <br/>
                            <br/>
                            <div className='pet-bio-card'>
                                <div className='pet-bio-container'>
                                    <label>{`${this.props.petToEdit.firstName}'s Story`}</label><br/>
                                    <input name='bio' type='text' value={this.state.bio} onChange={this.handleChange}></input><br/><br/>
                                </div>
                            </div>
                        </div>
                        <div className='pet-information-card'>
                            <div className='pet-information-container'>
                                <label>Name</label><br/>
                                <input name='firstName' type='text' value={this.state.firstName} onChange={this.handleChange}></input><br/><br/>

                                <label>Middle Name</label><br/>
                                <input name='middleName' type='text' value={this.state.middleName} onChange={this.handleChange}></input><br/><br/>

                                <label>Last Name</label><br/>
                                <input name='lastName' type='text' value={this.state.lastName} onChange={this.handleChange}></input><br/><br/>

                                <label>Weight</label><br/>
                                <input name='weight' type='text' value={this.state.weight} onChange={this.handleChange}></input><br/><br/>

                                <label>Age</label><br/>
                                <input name='age' type='text' value={this.state.age} onChange={this.handleChange}></input><br/><br/>

                                <label>People Skills</label><br/>
                                <input name='peopleSkills' type='text' value={this.state.peopleSkills} onChange={this.handleChange}></input><br/><br/>
                            </div>
                        </div>
                        <div className='pet-information-card'>
                            <div className='pet-information-container'>
                                <label>Dog Skills</label><br/>
                                <input name='dogSkills' type='text' value={this.state.dogSkills} onChange={this.handleChange}></input><br/><br/>

                                <label>Favorite Treat</label><br/>
                                <input name='favTreat' type='text' value={this.state.favTreat} onChange={this.handleChange}></input><br/><br/>

                                <label>Favorite Toy</label><br/>
                                <input name='favToy' type='text' value={this.state.favToy} onChange={this.handleChange}></input><br/><br/>

                                <label>Breed</label><br/>
                                <input name='breed' type='text' value={this.state.breed} onChange={this.handleChange}></input><br/><br/>

                                <label>Spayed/Neutered</label><br/>
                                <input name='fixed' type='text' value={this.state.fixed} onChange={this.handleChange}></input><br/><br/>

                                <label>Male/Female</label><br/>
                                <input name='sex' type='text' value={this.state.sex} onChange={this.handleChange}></input><br/><br/>
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