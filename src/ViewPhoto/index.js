import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios'
require('../App.css');


//Styles for Modal
const customStyles = {
  content : {
    backgroundColor: 'rgba(69,179,224)'
  }
};

// Allows Accessibility Reading
Modal.setAppElement('#root')

class ViewPhoto extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewPhoto: props.viewPhoto,
			url: props.photoToView.photoUrl,
			addComment: false,
			commentBody: '',
			selectedFile: null,
			comment: []
		}
	}
	componentDidMount(){
		this.getPhoto().then(photo => {
			if(photo.status === 200) {
				console.log(photo.data.comment);
				this.setState({
					comment: [...photo.data.comment]
				})
			} else {
				this.setState({
					comment: []
				})
			}
		})
	}
	getPhoto = async () => {
		const photo = await fetch(process.env.REACT_APP_URL + '/photo/' + this.props.photoToView._id ,{
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type':'application/json'
			}
		})
		const parsedResponse = await photo.json();
		return parsedResponse
	}
	toggleAddComment = () => {
		if(!this.state.addComment) {
			this.setState({
				addComment: true
			})
		} else {
			this.setState({
				addComment: false
			})
		}
			
	}
	fileSelectHandler = (e) => {
		this.setState({
			selectedFile: e.target.files[0]
		})
	}
	newComment = async () => {
		const formData = new FormData();
		if(this.state.selectedFile) {
			formData.append('photo', this.state.selectedFile, this.state.selectedFile.name);
		} else {
			formData.append('photo', this.state.selectedFile)
		}
		formData.append('commentBody', this.state.commentBody);
		await axios.post(process.env.REACT_APP_URL + '/photo/' + this.props.photoToView._id + '/comment/new', formData, { withCredentials: true}).then((response) => {
				if(response.status === 200) {
					this.setState({
						comment: [...response.data.data.comment],
						addComment: false
					})
				}
			}
		)
	}
	handlePostSubmit = async (e) => {
		e.preventDefault();
		this.newComment();
	}
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	deleteComment = async (id) => {
		console.log(id);
	}
	editCommentOpen = async (comment) => {
		console.log(comment);
	}
	render() {
		let commentButtons = null
		if(this.state.comment.length > 0) {
			if(this.props.photoToView.createdBy === this.props.userInfo.username && this.props.photoToView.createdBy === this.props.photoToView.comment.createdBy) {
					commentButtons = 
						<div>
							<button className='medPosBtns' onClick={this.editCommentOpen.bind(null, this.props.photoToView.comment)}>Edit</button>
							<button className='medNegBtns' onClick={this.deleteComment.bind(null, this.props.photoToView.comment._id)}>Delete</button>
						</div>
				} else if(this.props.photoToView.comment.createdBy === this.props.userInfo.username) {
					commentButtons = 
					<div>
						<button className='medPosBtns' onClick={this.editCommentOpen.bind(null, this.props.photoToView.comment)}>Edit</button>
						<button className='medNegBtns' onClick={this.deleteComment.bind(null, this.props.photoToView.comment._id)}>Delete</button>
					</div>
				} else if(this.props.photoToView.createdBy === this.props.userInfo.username && this.props.photoToView.comment.createdBy !== this.props.userInfo.username) {
					commentButtons = 
						<button className='medNegBtns' onClick={this.deleteComment.bind(null, this.props.photoToView.comment._id)}>Delete</button>
				} else {
					commentButtons = null
				}
		}
		let photoComments = null
		if(this.state.comment) {
			photoComments = this.state.comment.map((comments) => {
				return (
					<div key={comments._id}>
						<div className='comment-card'>
							<div className='comment-container'>
								<div className='comment-header'>
									<b>{comments.createdBy}</b><span> {comments.createdAt}</span>
								</div>
								<div className='comment-body'>
									{comments.commentBody}
								</div>
								{commentButtons}
							</div>
						</div>
					</div>
				)
			})
		}
		return (
			<Modal
				isOpen={this.state.viewPhoto} 
				style={customStyles}
				onRequestClose={this.props.photoViewClose}>
		        <div>
		        	<div>
		        		<div className='photo-container'>
		        			<img alt='User Upload' src={`${process.env.REACT_APP_URL}/${this.state.url}`}/>
		        		</div>
		        	</div>
		    		<div className='comment-container'>
		    			{photoComments}
		    			{this.state.addComment ? 
						<div>
							<form onSubmit={this.handlePostSubmit}>
								<label>What would you like to say?</label>
								<input type='text' name='commentBody' onChange={this.handleChange}/>
								<label>Add Photo?</label>
								<input type="file" name="photo" onChange={this.props.fileSelectHandler} ref={fileInput => this.fileInput = fileInput} />
								<button/>
							</form>
						</div>
						 : null}
						 <button onClick={this.toggleAddComment}>Comment?</button>
		    		</div>
		        </div>
		        <button onClick={this.props.photoViewClose}>close</button>
	        </Modal>
		)
	}
}

export default ViewPhoto