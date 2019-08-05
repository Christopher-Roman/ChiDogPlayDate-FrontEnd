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
			          <p>{post.postBody}</p>
			        </div>
			        <div className="card-action">
			          <a href="#">This is a link</a>
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