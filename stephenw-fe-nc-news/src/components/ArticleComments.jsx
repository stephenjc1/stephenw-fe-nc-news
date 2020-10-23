import axios from 'axios';
import React, { Component } from 'react';
import CommentAdder from './CommentAdder.jsx';
import loggedInUsername from '../utils/utils';


class ArticleComments extends Component {

  state = {
    comments: [],
    isLoading: true,
  }

  componentDidMount() {
    axios.get(`https://stephen-fe-nc-news.herokuapp.com/api/articles/${this.props.article_id}/comments`).then(({ data: { comments } }) => {
      this.setState({ comments, isLoading: false })
    })
  }

  updateCommentsList = (comment) => {
    this.setState((currState) => ({
      comments: [comment, ...currState.comments],
    }))
  }

  deleteComment = (commentIdToDelete) => {
    axios.delete(`https://stephen-fe-nc-news.herokuapp.com/api/comments/${commentIdToDelete}`).then(() => {
      this.setState((prevState) => {
        const newComments = prevState.comments.filter(comment => {
          return comment.comment_id !== commentIdToDelete
        })
        return { comments: newComments }
      });
    }).catch(() => {
      this.setState((prevState) => {
        return prevState;
      })
    })
  }

  // componentDidUpdate(prevState) {
  //   if(prevState.comments !== )
  // }

  render() {
    const { comments } = this.state
    return (
      <>
        <h3>COMMENTS</h3>
        <ul>
          {comments.map(comment => {
            return <li key={comment.comment_id}>
              <p> {comment.body} </p>
              <button disabled={comment.author !== loggedInUsername} onClick={() => this.deleteComment(comment.comment_id)}
              >Delete Comment</button>
            </li>
          })}
        </ul>
        <CommentAdder updateCommentsList={this.updateCommentsList} article_id={this.props.article_id} />
      </>
    );
  }
}

export default ArticleComments;