import React, { Component } from 'react';
import Modal from 'react-modal';
import EditCommentModal from '../EditCommentModal'
import axios from 'axios'
require('../../App.css');


//Styles for Modal
const customStyles = {
  content : {
    backgroundColor: '#90a4ae'
  }
};

// Allows Accessibility Reading for Modal
Modal.setAppElement('#root')

class ViewPhoto extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewPhoto: props.viewPhoto,
			url: props.photoToView.photoUrl,
			addComment: false,
			editComment: false,
			commentBody: '',
			selectedFile: null,
			comment: [],
			commentToEdit: {
				commentBody: '',
				photo: '',
				_id: ''
			}
		}
	}
	componentDidMount(){
		this.getPhoto().then(photo => {
			if(photo.status === 200) {
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
			formData.append('commentBody', this.state.commentBody)
		} else {
			formData.append('commentBody', this.state.commentBody)
		}
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
		try {
			const deletedComment = await fetch(process.env.REACT_APP_URL + '/photo/' + this.props.photoToView._id + '/comment/' + id + '/delete', {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type':'application/json'
				}
			})
			const parsedResponse = await deletedComment.json();
			let photoComments = parsedResponse.data.comment;
			this.setState({
				comment: photoComments
			})
		} catch(err) {
			console.error(err)
		}
	}
	closeAndUpdateComment = async () => {
		try {
			const formData = new FormData();
			if(this.state.selectedFile) {
				formData.append('photo', this.state.selectedFile, this.state.selectedFile.name);
				formData.append('commentBody', this.state.commentToEdit.commentBody)
			} else {
				formData.append('commentBody', this.state.commentToEdit.commentBody);
			}
			await axios.put(process.env.REACT_APP_URL + '/photo/' + this.props.photoToView._id + '/comment/' + this.state.commentToEdit._id + '/update', formData, {withCredentials: true}).then((response) => {
				if(response.status === 200) {
					this.setState({
						comment: [...response.data.data.comment],
						editComment: false
					})
				}
			})
		} catch(err) {
			console.error(err)
		}
	}
	editCommentOpen = (comment) => {
		this.setState({
			editComment: true,
			commentToEdit: {
				...comment

			}
		})
	}
	editCommentClose = () => {
		this.setState({
			editComment: false
		})
	}
	handlePutSubmit = async (e) => {
		e.preventDefault();
		this.closeAndUpdateComment();
		this.getPhoto();
	}
	handleCommentEditChange = (e) => {
		this.setState({
			commentToEdit: {
				...this.state.commentToEdit,
				[e.currentTarget.name]:e.currentTarget.value
			}
		})
	}
	render() {
		let photoComments = null
		if(this.state.comment) {
			photoComments = this.state.comment.map((comments) => {
				let commentButtons = null
				if(this.state.comment.length > 0) {
					if(this.props.photoToView.createdBy === this.props.userInfo.username && this.props.photoToView.createdBy === comments.createdBy) {
							commentButtons = 
								<div>
									<button className='btn-medium waves-effect waves-light green darken-1' onClick={this.editCommentOpen.bind(null, comments)}><i className="material-icons right">mode_edit</i></button>
									<button className='btn-medium waves-effect waves-light red accent-4' onClick={this.deleteComment.bind(null, comments._id)}><i className="material-icons right">delete_forever</i></button>
								</div>
						} else if(comments.createdBy === this.props.userInfo.username) {
							commentButtons = 
							<div>
								<button className='btn-medium waves-effect waves-light green darken-1' onClick={this.editCommentOpen.bind(null, comments)}><i className="material-icons right">mode_edit</i></button>
								<button className='btn-medium waves-effect waves-light red accent-4' onClick={this.deleteComment.bind(null, comments._id)}><i className="material-icons right">delete_forever</i></button>
							</div>
						} else if(this.props.photoToView.createdBy === this.props.userInfo.username && comments.createdBy !== this.props.userInfo.username) {
							commentButtons = 
								<button className='btn-medium waves-effect waves-light red accent-4' onClick={this.deleteComment.bind(null, comments._id)}><i className="material-icons right">delete_forever</i></button>
						} else {
							commentButtons = null
						}
				}
				return (
					<div key={comments._id} className="row">
					    <div className="col s6 m3 l2">
					      <div className="card grey lighten-1">
					        <div className="card-content blue-text text-darken-2">
					          <span className="comemnt-title">{comments.createdBy} on {new Intl.DateTimeFormat('en-US', { 
						                month: 'short', 
						                day: '2-digit',
						                year: 'numeric', 
						            }).format(new Date(comments.createdAt))}
					          </span>
					          <p>{comments.commentBody}</p>
					          {comments.photo ?
					          	<div>
					          		<img alt='User upload' className='photoList' src={`${process.env.REACT_APP_URL}/${comments.photo}`} />
					          	</div>
					          	: null}
					        </div>
					        <div className="card-action">
					        	{commentButtons}
					        </div>
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
		        <div className='view-photo'>
		        	<div className='photo-container'>
		        		<img className='pet-photo' alt='User Upload' src={`${process.env.REACT_APP_URL}/${this.state.url}`}/>
						 <br/>
						 <button onClick={this.toggleAddComment}>Comment?</button>
		        	</div>
		    		<div className='comment-container'>
		    			{photoComments}
		    			{this.state.editComment ? <EditCommentModal handlePutSubmit={this.handlePutSubmit} commentToEdit={this.state.commentToEdit} handleCommentEditChange={this.handleCommentEditChange} editCommentClose={this.editCommentClose} editComment={this.state.editComment}  /> : null}
		    			{this.state.addComment ? 
						<div>
							<form onSubmit={this.handlePostSubmit}>
								<label>What would you like to say?</label>
								<input type='text' name='commentBody' onChange={this.handleChange}/>
								<label>Add Photo?</label>
								<input type="file" name="photo" onChange={this.props.fileSelectHandler} ref={fileInput => this.fileInput = fileInput} />
								<button>submit</button>
							</form>
						</div>
						 : null}
		    		</div>
		        </div>
		        <button className='close' onClick={this.props.photoViewClose}><i className="material-icons">close</i></button>
	        </Modal>
		)
	}
}

export default ViewPhoto