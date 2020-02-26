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
            selectedFile: props.selectedFile
        }
    }
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className='pet-view-container'>
                    <div className='pet-info-container'>
                        <div className='pet-bio-card'>
                            <div className='pet-bio-container'>
                                <label>{`${this.props.petToEdit.firstName}'s Story`}</label><br/>
                                <input name='bio' type='text' defaultValue={this.props.petToEdit.bio} onChange={this.props.handleChange}></input><br/><br/>
                            </div>
                        </div>
                    </div>
                    <div className='pet-information-card'>
                        <div className='pet-information-container'>
                            <label>Name</label><br/>
                            <input name='firstName' type='text' defaultValue={this.props.petToEdit.firstName} onChange={this.props.handleChange}></input><br/><br/>

                            <label>Middle Name</label><br/>
                            <input name='middleName' type='text' defaultValue={this.props.petToEdit.middleName} onChange={this.props.handleChange}></input><br/><br/>

                            <label>Last Name</label><br/>
                            <input name='lastName' type='text' defaultValue={this.props.petToEdit.lastName} onChange={this.props.handleChange}></input><br/><br/>

                            <label>Weight</label><br/>
                            <select name='weight' defaultValue={this.props.petToEdit.weight} onChange={this.props.handleChange} >
                                {dogWeight.map((weights) => <option key={weights.value} value={weights.value}>{weights.value}</option>)}
                            </select>

                            <label>Age</label><br/>
                            <input name='age' type='text' defaultValue={this.props.petToEdit.age} onChange={this.props.handleChange}></input><br/><br/>

                            <label>People Skills</label><br/>
                            <select name='peopleSkills' defaultValue={this.props.petToEdit.peopleSkills} onChange={this.props.handleChange} >
                                {peopleSkills.map((pSkill) => <option key={pSkill.value} value={pSkill.value}>{pSkill.value}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className='pet-information-card'>
                        <div className='pet-information-container'>
                            <label>
                              Breed:
                            </label>
                              <select name='breed' defaultValue={this.props.petToEdit.breed} onChange={this.props.handleChange} >
                                {dogBreeds.map((breed) => <option key={breed.value} value={breed.value}>{breed.value}</option>)}
                            </select>
                            <label>Dog Skills</label><br/>
                            <select name='dogSkills' defaultValue={this.props.petToEdit.dogSkills} onChange={this.props.handleChange} >
                                {dogSkills.map((dSkills) => <option key={dSkills.value} value={dSkills.value}>{dSkills.value}</option>)}
                            </select>

                            <label>Favorite Treat</label><br/>
                            <select name='favTreat' defaultValue={this.props.petToEdit.favTreat} onChange={this.props.handleChange} >
                                {dogTreat.map((treats) => <option key={treats.value} value={treats.value}>{treats.value}</option>)}
                            </select>

                            <label>Favorite Toy</label><br/>
                            <select name='favToy' defaultValue={this.props.petToEdit.favToy} onChange={this.props.handleChange} >
                                {dogToy.map((toys) => <option key={toys.value} value={toys.value}>{toys.value}</option>)}
                            </select>
                            <label>Spayed/Neutered</label><br/>
                            <select name='fixed' defaultValue={this.props.petToEdit.fixed} onChange={this.props.handleChange} >
                                {dogFixed.map((fix) => <option key={fix.value} value={fix.value}>{fix.value}</option>)}
                            </select>

                            <label>Male/Female</label><br/>
                            <select name='sex' defaultValue={this.props.petToEdit.sex} onChange={this.props.handleChange} >
                                {dogSex.map((sexes) => <option key={sexes.value} value={sexes.value}>{sexes.value}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <button>Submit</button>
                <button type='button' onClick={this.props.closeEditPetModal}>Close</button>
            </form>
        )
    }
}

export default EditPet