import React from 'react';
require('../App.css');

const Posts = (props) => {
	let response = null;
	if(props.postInfo.length <= 0) {
		response = <p>{props.userInfo}, what's on your mind?</p>
		return response
	} else {
		const posts = props.postInfo.map((post, i) => {
			return (
			    <div className="col s12 m6" key={i}>
			      <div className="card blue-grey darken-1">
			        <div className="card-content white-text">
			          <span className="card-title">{post.postTitle}</span>
			          <p className='truncate'>{post.postBody}</p>
			        </div>
			        <div className="card-action">
			          <button className='btn-flat waves-effect waves-light red accent-4' onClick={props.deletePost.bind(null, post._id)}>Delete</button>
			          <a href="#">This is a link</a>
			        </div>
			      </div>
			    </div>
			)
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

export default Posts