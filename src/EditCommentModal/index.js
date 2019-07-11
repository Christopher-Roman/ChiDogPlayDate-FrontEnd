import React, { Component } from 'react';
import Modal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor     : 'rgba(69,179,224)'
  }
};

// Allows Accessibility Reading
Modal.setAppElement('#root')

class EditPhotoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: props.selectedFile
    }
  }
  render() {
      return (
        <Modal
        isOpen={this.props.editComment} 
        style={customStyles}
        onRequestClose={this.props.editCommentClose}>
            <div>Update Your Photo</div>
            <br/>
            <form onSubmit={this.props.handlePutSubmit}>
              <label>Comment Body</label>
              <br/>
                <input value={this.props.CommentToEdit} name='commentBody' type='text' onChange={this.props.handleCommentEditChange} />
                <br/>
                <label>Pet Photo</label>
                <br/>
                <input type="file" name="photo" onChange={this.props.fileSelectHandler} ref={fileInput => this.fileInput = fileInput} />
              <button>Submit</button>
            </form>
            <button onClick={this.props.editCommentClose}>close</button>
          </Modal>
      )
  }
}

export default EditPhotoModal;

