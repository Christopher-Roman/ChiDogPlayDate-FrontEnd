import React, { Component } from 'react';
import HeaderApp from './HeaderApp';
import Login from './AuthContainer/Login';
import Register from './AuthContainer/Register';
import PetContainer from './PetContainer';
import ParkContainer from './ParkContainer';
import PhotoContainer from './PhotoContainer';
import UserContainer from './UserContainer';
import PostContainer from './PostContainer';
import './App.css';

let loginAttempt = 0

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      loginFail: false,
      register: false,
      confirmed: false,
      view: null
    }
  }
  handleLogout = async (e) => {
    try {
      const logoutRequest = await fetch(process.env.REACT_APP_URL + '/users/logout', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type':'application/json'
        }
      });

      const logoutRequestParsed = await logoutRequest.json();
      if(logoutRequestParsed.status === 200) {
        this.setState({
          loggedIn: false,
          loginFail: false,
          register: false,
          confirmed: false,
          view: null
        });
      } else {
        console.log('Logout Request Error -- ', logoutRequestParsed.error);
      }
    } catch(err) {
      console.error(err);
    }
  }
  confirmConstruction = (e) => {
    e.preventDefault();
    this.setState({
      confirmed: true
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginReponse = await fetch(process.env.REACT_APP_URL + '/users/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type':'application/json'
        }
      })
      const parsedResponse = await loginReponse.json();
      if(parsedResponse.status === 200) {
        this.setState({
          loggedIn: true,
          loginFail: false,
          register: false
        })
      } else if(parsedResponse.status === 401 || parsedResponse.status === 400) {
        loginAttempt ++
        if(loginAttempt >= 3) {
          this.setState({
            loggedIn: false,
            loginFail: true,
            register: false
          })
        }
      }
    } catch(err) {
      console.error(err)
    }
  }
  setUser = (username) => {
    this.setState({
      username: username
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  register = (e) => {
    e.preventDefault();
    this.setState({
      register: true,
      loginFail: false
    })
  }
  loggedIn = (e) => {
    loginAttempt = 0
    this.setState({
      loggedIn: true,
      register: false,
      loginFail: false
    })
  }
  haveAnAccount = (e) => {
    this.setState({
      register: false,
      loginFail: false
    })
  }
  viewPets = (e) => {
    this.setState({
      view: 'pet'
    })
  }
  viewPhotos = (e) => {
    this.setState({
      view: 'photo'
    })
  }
  viewPosts = (e) => {
    this.setState({
      view: 'post'
    })
  }
  viewUser = (e) => {
    this.setState({
      view: 'user'
    })
  }
  viewMaps = (e) => {
    this.setState({
      view: 'parks'
    })
  }
  render(){
    return (
      <div>
          <div className='navbar'>
            <HeaderApp userInfo={this.state} handleLogout={this.handleLogout} viewPets={this.viewPets} viewPhotos={this.viewPhotos} viewPosts={this.viewPosts} viewUser={this.viewUser} viewMaps={this.viewMaps} />
          </div>
        <div>
          <div className='container'>
            <br/>
            <br/>
            <br/>
            {!this.state.loggedIn && !this.state.loginFail && !this.state.register ? <Login registration={this.register} handleChange={this.handleChange} handleSubmit={this.handleSubmit} /> : null }
            
            {this.state.register || this.state.loginFail ? <Register setUser={this.setUser} haveAnAccount={this.haveAnAccount} loggedIn={this.loggedIn} register={this.register} userInfo={this.state} /> : null }
            
            {this.state.view === 'pet' && this.state.loggedIn ? <PetContainer handleChange={this.handleChange} userInfo={this.state} /> : null }
            
            {this.state.view === 'parks' && this.state.loggedIn ? <ParkContainer changeView={this.changeView} userInfo={this.state} /> : null}
            
            {this.state.view === 'photo' && this.state.loggedIn  ? <PhotoContainer userInfo={this.state.username} /> : null}
            
            {this.state.view === 'user' && this.state.loggedIn  ? <UserContainer userInfo={this.state} /> : null}
            
            {this.state.view === 'post' && this.state.loggedIn ? <PostContainer userInfo={this.state} /> : null}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
