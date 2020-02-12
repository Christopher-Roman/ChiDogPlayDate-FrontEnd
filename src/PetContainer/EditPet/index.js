import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import  { dogBreeds, dogSkills, peopleSkills, dogSex, dogFixed, dogTreat, dogPlay, dogToy, dogWeight } from '../../variables'

require('../../App.css');


//Styles for Modal
const customStyles = {
  content : {
    backgroundColor: '#455a64'
  }
};

// Allows Accessibility Reading
Modal.setAppElement('#root')

class EditPet extends Component {
    constructor(props) {
        super(props);
        this.state= {
            breeds: dogBreeds,
            dSkills: dogSkills,
            pSkills: peopleSkills,
            dSex: dogSex,
            dTreat: dogTreat,
            dPlay: dogPlay,
            dToy: dogToy,
            dWeight: dogWeight,
            dFixed: dogFixed,
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
    }
    closeAndUpdatePet = async () => {
        try {
            const formData = new FormData();
            if(this.state.selectedFile) {
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
                    if(response.status === 200) {
                        console.log(response);
                    }
                })
            } else {
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
                    if(response.status === 200) {
                        console.log(response.data.data.pet);
                        // this.setState({
                        //     ...response.data.data[0]
                        // })
                    }
                })
            }
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
    }
    //<div className='photo-card'>
       // <div className='photo-container'>
         //   <img alt='pet' src={`${process.env.REACT_APP_URL}/${this.props.petToEdit.petPhoto}`}/>
       //   </div>
       // <input type="file" name="petPhoto" onChange={this.fileSelectHandler} ref={fileInput => this.fileInput = fileInput} />
    //</div>
    render() {
        return (
            <Modal
            isOpen={this.props.editPetModal} 
            style={customStyles}
            onRequestClose={this.props.closeEditPetModal}>
                <div>
                    <br/>
                    <br/>
                    <form onSubmit={this.handleEditSubmit}>
                        <div className='pet-view-container'>
                            <div className='pet-info-container'>
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
                                    <select name='weight' value={this.state.weight} onChange={this.handleChange} >
                                        {this.state.dWeight.map((weights) => <option key={weights.value} value={weights.value}>{weights.value}</option>)}
                                    </select>

                                    <label>Age</label><br/>
                                    <input name='age' type='text' value={this.state.age} onChange={this.handleChange}></input><br/><br/>

                                    <label>People Skills</label><br/>
                                    <select name='peopleSkills' value={this.state.peopleSkills} onChange={this.handleChange} >
                                        {this.state.pSkills.map((pSkill) => <option key={pSkill.value} value={pSkill.value}>{pSkill.value}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className='pet-information-card'>
                                <div className='pet-information-container'>
                                    <label>
                                      Breed:
                                    </label>
                                      <select name='breed' value={this.state.breed} onChange={this.handleChange} >
                                        {this.state.breeds.map((breed) => <option key={breed.value} value={breed.value}>{breed.value}</option>)}
                                    </select>
                                    <label>Dog Skills</label><br/>
                                    <select name='dogSkills' value={this.state.dogSkills} onChange={this.handleChange} >
                                        {this.state.dSkills.map((dSkills) => <option key={dSkills.value} value={dSkills.value}>{dSkills.value}</option>)}
                                    </select>

                                    <label>Favorite Treat</label><br/>
                                    <select name='favTreat' value={this.state.favTreat} onChange={this.handleChange} >
                                        {this.state.dTreat.map((treats) => <option key={treats.value} value={treats.value}>{treats.value}</option>)}
                                    </select>

                                    <label>Favorite Toy</label><br/>
                                    <select name='favToy' value={this.state.favToy} onChange={this.handleChange} >
                                        {this.state.dToy.map((toys) => <option key={toys.value} value={toys.value}>{toys.value}</option>)}
                                    </select>
                                    <label>Spayed/Neutered</label><br/>
                                    <select name='fixed' value={this.state.fixed} onChange={this.handleChange} >
                                        {this.state.dFixed.map((fix) => <option key={fix.value} value={fix.value}>{fix.value}</option>)}
                                    </select>

                                    <label>Male/Female</label><br/>
                                    <select name='sex' value={this.state.sex} onChange={this.handleChange} >
                                        {this.state.dSex.map((sexes) => <option key={sexes.value} value={sexes.value}>{sexes.value}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button>Submit</button>
                        <button onClick={this.props.closeEditPetModal}>Close</button>
                    </form>
                </div>
          </Modal>
        )
    }
}

export default EditPet