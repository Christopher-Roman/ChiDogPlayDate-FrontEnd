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

// const photoComments = props.photoInfo.comments.map((comments) => {
// 	if(comments.createdBy === props.userInfo.username) {
// 		let commentButtons = return (
// 			<button className='medPosBtns' onClick={props.editCommentOpen.bind(null, photo)}>Edit</button>
// 			<button className='medNegBtns' onClick={props.deleteComment.bind(null, photo._id)}>Delete</button>
// 		)
// 	}
// 	return (
// 		<div key={comments._id}>
// 			<div className='comment-card'>
// 				<div className='comment-container'>
// 					<div className='comment-header'>
// 						<b>{comments.createdBy}</b><span> {comments.createdAt}</span>
// 					</div>
// 					<div className='comment-body'>
// 						{comments.commentBody}
// 					</div>
// 				</div>
// 			</div>
			
// 		</div>
// 	)
// })

class ViewPhoto extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewPhoto: props.viewPhoto,
			url: props.photoToView.photoUrl
		}
	}
	render() {
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
		    		</div>
		        </div>
		        <button onClick={this.props.photoViewClose}>close</button>
	        </Modal>
		)
	}
}

export default ViewPhoto