import React from 'react';
require('../../App.css')


//*****************************************//
//										   //
//		Stateless login component with     //
//		Conditional rendering in App.js	   //
//										   //
//*****************************************//

const Login = (props) => {
	return (
		<div className="container">
			<div className='row valign-wrapper center'>
				<div className='col s m7 l6 offset-m3 offset-l3 valign'>
					<div className='card blue-grey lighten-4'>
						<div className='card-action blue darken-2 white-text'>
							<h2 className='blue-grey-text text-lighten-4'>Login</h2>
						</div>
						<div className='card-content'>
							<div className='form-field'>
								<label>Username</label>
								<input type='text' name='username' onChange={props.handleChange}></input><br/>
							</div>
							<div className='form-field'>
								<label>Password</label>
								<input type='password' name='password' onChange={props.handleChange}></input><br/>
							</div>
							<div className='form-field center-align'>
								<button onClick={props.handleSubmit} className="btn-large waves-effect waves-light blue darken-2 blue-grey-text text-lighten-4 center-align">Login</button>
							</div>
							<small><h6>Need an account? <button className="btn-flat waves-effect waves-light btn-small" onClick={props.registration}>register</button></h6></small>
						</div>
					</div>  
		    	</div>
	    	</div>
	    </div>
	)
}

export default Login;