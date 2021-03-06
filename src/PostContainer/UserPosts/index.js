import React from 'react';
require('../../App.css');

const UserPosts = (props) => {
	console.log(props);
	let response = null;
	if(props.posts.length <= 0) {
		response = <p>{props.userInfo}, what's on your mind?</p>
		return response
	} else {
		const posts = props.posts.map((post, i) => {
		if(props.user) {
			return (
				<div key={i}>
			      <div className="card grey lighten-1">
			        <div className="card-content blue-text text-darken-2">
			          <span className="card-title">{post.postTitle}</span>
			          <p className='truncate'>{post.postBody}</p>
			        </div>
			      </div>
			    </div>
			)
		} else {
			return (
			    <div key={i}>
			      <div className="card grey lighten-1">
			        <div className="card-content blue-text text-darken-2">
			          <span className="card-title">{post.postTitle}</span>
			          <p className='truncate'>{post.postBody}</p>
			        </div>
			        <div className="card-action">
			          <button className='btn-flat waves-effect waves-light blue-text text-darken-2' onClick={props.openPost.bind(null, post)}>View</button>
			          <button className='btn-flat waves-effect waves-light blue-text text-darken-2' onClick={props.editPostOpen.bind(null, post)}>Edit</button>
			          <button className='btn-flat waves-effect waves-light blue-text text-darken-2' onClick={props.deletePost.bind(null, post._id)}>Delete</button>
			        </div>
			      </div>
			    </div>
			)
		}
	})
		return (
			<div className='row'>
			{response}
			<br/>
			{posts}
			<br/>
			</div>
		)
	}
}

export default UserPosts