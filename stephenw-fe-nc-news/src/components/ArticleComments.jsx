import axios from 'axios';
import React, { Component } from 'react';
// import CommentAdder from './CommentAdder';
import CommentAdder from './CommentAdder.jsx';


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


  render() {
    const { comments } = this.state
    return (
      <>
        <h3>COMMENTS</h3>
        <ul>
          {comments.map(comment => {
            return <li key={comment.comment_id}>
              {comment.body}
            </li>
          })}
        </ul>
        <CommentAdder updateCommentsList={this.updateCommentsList} article_id={this.props.article_id} />
      </>
    );
  }
}

export default ArticleComments;