import axios from 'axios';
import React, { Component } from 'react';

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
  render() {
    const { comments } = this.state
    return (
      <>
        <h3>COMMENTS</h3>
        <main>
          {comments.map(comment => {
            return <li key={comment.comment_id}>
              {comment.body}
            </li>
          })}
        </main>
      </>
    );
  }
}

export default ArticleComments;