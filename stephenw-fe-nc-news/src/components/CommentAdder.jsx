import React, { Component } from 'react';
import { postComment } from '../api';
import loggedInUsername from '../utils/utils.jsx';


class CommentAdder extends Component {
  state = {
    userComment: "",
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const newComment = { body: this.state.userComment, username: loggedInUsername };
    postComment(newComment, this.props.article_id).then(({ data: { comment } }) => this.props.updateCommentsList(comment))
  }


  handleChange = (ev) => {
    const value = ev.target.value;
    this.setState(() => {
      return {
        userComment: value,
      }
    })
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} >
          <textarea onChange={this.handleChange} value={this.state.userComment} > </textarea>
          <button>
            Post Comment.
        </button>
        </form>
      </>
    );
  }
}

// disabled = { username !== loggedInUsername}

export default CommentAdder;


