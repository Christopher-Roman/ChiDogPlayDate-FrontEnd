import React, { Component } from 'react';
import UserPosts from './UserPosts'
import ViewPost from './ViewPost'
import EditPost from './EditPost'
import OtherPosts from './OtherPosts'
import axios from 'axios';

require ('../App.css');

class PostContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: props.userInfo.username,
			postTitle: '',
			postBody: '',
			posts: [],
			editPost: false,
			createPost: false,
			viewPost: false,
			activePosts: false,
			newPost: false,
			postToEdit: {
				postTitle: '',
				postBody: ''
			},
			postToView: {
				postTitle: '',
				postBody: '',
				comments: []
			}
		}
	}
	getPosts = async () => {
		const post = await fetch(process.env.REACT_APP_URL + '/post', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsedResponse = await post.json();
		return parsedResponse
	}
	componentDidMount() {
		this.getPosts().then(post => {
			if(post.status === 200) {
				let allPosts = post.data
				console.log(allPosts);
				this.setState({
					posts: allPosts,
					activePosts: true
				})
			} else {
				console.log(post.status);
			}
		})
	}
	newPost = async (e) => {
		e.preventDefault();
		try {
			const post = await fetch(process.env.REACT_APP_URL + '/post/new', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					postTitle: this.state.postTitle,
					postBody: this.state.postBody
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const parsedResponse = await post.json()
			this.setState({
				posts: [...this.state.posts, parsedResponse.data],
				createPost: false,
				newPost: false
			})
		} catch(err) {
			console.log(err)
		}
	}
	viewPost = async (post) => {
		try {
			const selectedPost = await fetch(process.env.REACT_APP_URL + '/post/' + post._id, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type':'application/json'
				}
			})
			const parsedResponse = await selectedPost.json();
			return parsedResponse

		} catch(err) {
			console.log(err)
		}
	}
	newPostToggle = () => {
		if(this.state.newPost) {
			this.setState({
				newPost: false
			})
		} else {
			this.setState({
				newPost: true
			})
		}
	}
	viewPostToggle = (post) => {
		if(!this.state.viewPost) {
			this.setState({
				viewPost: true,
				activePosts: false,
				postToView: {
					...post
				}
			})
		} else {
			this.setState({
				viewPost: false,
				activePosts: true
			})
		}
	}
	editPostOpen = (post) => {
		this.setState({
			editPost: true,
			activePosts: false,
			postToEdit: {
				...post
			}
		})
	}
	editPostClose = (post) => {
		this.setState({
			editPost: false,
			activePosts: true
		})
	}
	handlePostEditChange = (e) => {
		this.setState({
			postToEdit: {
				...this.state.postToEdit,
				[e.currentTarget.name]: e.currentTarget.value
			}
		})
	}
	deletePost = async (id) => {
		try {
			const deletePost = await fetch(process.env.REACT_APP_URL + '/post/delete/' + id, {
				method: 'DELETE',
				credentials: 'include',
				headers: {
					'Content-Type':'application/json'
				}
			})
			const parsedResponse = await deletePost.json();
			let remainingPosts = parsedResponse.data.post
			console.log(remainingPosts);
			this.setState({
				posts: remainingPosts
			})
		} catch(err) {
			console.log(err)
		}
	}
	handleChange = (e) => {
	    this.setState({
	      [e.currentTarget.name]: e.currentTarget.value
	    })
  	}
	render() {
		return (
			<div className="post_container">
				<div className='new_post_button'>
					{!this.state.newPost ? <button className='btn-large grey lighten-1 blue-text text-darken-2 center-align' onClick={this.newPostToggle}><i className="material-icons right">comment</i>New Post</button> : null}
				</div>
				<div>
					{this.state.newPost && !this.state.editPost && !this.state.viewPost ?
						<div className='blue-grey darken-1'>
							<form className='post_form' onSubmit={this.newPost}>
								<label>Post Title</label>
								<input name='postTitle' type='text' onChange={this.handleChange} />
								<label>Post Body</label>
								<input name='postBody' type='text' onChange={this.handleChange} />
								<button className='btn-large blue-grey center-align text-white'>Submit</button> <button className='btn-large blue-grey center-align text-white' onClick={this.newPostToggle}>Close</button>
							</form> 
						</div>
					: null}
				</div>
				<div id="user_posts">
					{this.state.activePosts && !this.state.newPost && !this.state.editPost && !this.state.viewPost ?
						<div> 
						<h1 className='post_headers'>Your Posts</h1>
						<UserPosts postInfo={this.state.posts} editPostOpen={this.editPostOpen} openPost={this.viewPostToggle} deletePost={this.deletePost} postInfo={this.state.posts} userInfo={this.state.username} />
						</div> 
						: !this.state.activePosts && this.state.viewPost && !this.state.editPost ? <ViewPost userInfo={this.props.userInfo} closePost={this.viewPostToggle} postToView={this.state.postToView} /> 
						: this.state.editPost && !this.state.activePosts && !this.state.viewPost ? <EditPost userInfo={this.props.userInfo} postToView={this.state.postToEdit} handlePostEditChange={this.handlePostEditChange} postClose={this.editPostClose} postInfo={this.state.posts} /> 
						: null }
				</div>
				<div id="global_posts">
					{this.state.activePosts && !this.state.newPost && !this.state.editPost && !this.state.viewPost ? 
					<div>
					<h1 className='post_headers'>What's everyone up to?</h1>
					<OtherPosts postInfo={this.state.posts} userInfo={this.state.username} openPost={this.viewPostToggle} />
					</div>
					: null }
				</div>
			</div>
		)
	}
}


export default PostContainer;



