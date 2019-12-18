import React, { Component } from 'react';
require('../../App.css')



//*****************************************//
//                                         //
//      Registration component with        //
//      conditional rendering in App.js    //
//                                         //
//*****************************************//

class Register extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			isValid: null
		}
	}
	registrationFailed = () => {
		this.setState({
			isValid: false
		})
	}
	handleChange = (e) => {
	    this.setState({
	      [e.currentTarget.name]: e.currentTarget.value
	    })
    }
    handleSubmit = async (e) => {
    	e.preventDefault();
    	const registerResponse = await fetch(process.env.REACT_APP_URL + '/users/register', {
    		method: 'POST',
    		credentials: 'include',
    		body: JSON.stringify(this.state),
    		headers: {
    			'Content-Type': 'application/json'
    		}
    	})
    	const parsedResponse = await registerResponse.json()
    	if(parsedResponse.status === 200) {
     		this.setState({
        		isValid: true,
        		register: false
        	}, () => {
        	   this.props.loggedIn()
            })
            this.props.setUser(this.state.username)
    	} else {
    		this.registrationFailed()
    	}
    }
    render(){   
    	if(this.props.userInfo.loginFail === true) {
    		return (
                <div className="container">
                    <h6>Looks like the credentials you entered are incorrect. Do you need to make an account?</h6>
                    <div className='row valign-wrapper center'>
                        <div className='col s m7 l6 offset-m3 offset-l3 valign'>
                            <div className='card blue-grey lighten-4'>
                                <div className='card-action blue darken-2 white-text'>
                                    <h2 className='blue-grey-text text-lighten-4'>Register</h2>
                                </div>
                                <div className='card-content'>
                                    <div className='form-field'>
                                        <label>Username</label>
                                        <input type='text' name='username' onChange={this.handleChange}></input><br/>
                                    </div>
                                    <div className='form-field'>
                                        <label>Password</label>
                                        <input type='password' name='password' onChange={this.handleChange}></input><br/>
                                    </div>
                                    <div className='form-field center-align'>
                                        <button onClick={this.handleSubmit} className="btn-large waves-effect waves-light blue darken-2 blue-grey-text text-lighten-4 center-align">Register</button>
                                    </div>
                                    <small><h6>Have an Account? <button className='btn-flat waves-effect waves-light btn-small' onClick={this.props.haveAnAccount}>Login</button></h6></small>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
	    	)
    	} else if(this.props.userInfo.loginFail === false && this.props.userInfo.register === true) {
    		return (
                <div className="container">
                    <div className='row valign-wrapper center'>
                        <div className='col s m7 l6 offset-m3 offset-l3 valign'>
                            <div className='card blue-grey lighten-4'>
                                <div className='card-action blue darken-2 white-text'>
                                    <h2 className='blue-grey-text text-lighten-4'>Register</h2>
                                </div>
                                <div className='card-content'>
                                    <div className='form-field'>
                                        <label>Username</label>
                                        <input type='text' name='username' onChange={this.handleChange}></input><br/>
                                    </div>
                                    <div className='form-field'>
                                        <label>Password</label>
                                        <input type='password' name='password' onChange={this.handleChange}></input><br/>
                                    </div>
                                    <div className='form-field center-align'>
                                        <button onClick={this.handleSubmit} className="btn-large waves-effect waves-light blue darken-2 blue-grey-text text-lighten-4 center-align">Register</button>
                                    </div>
                                    <small><h6>Have an Account? <button className='btn-flat waves-effect waves-light btn-small' onClick={this.props.haveAnAccount}>Login</button></h6></small>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
    		)
    	} 
    }
}

export default Register;