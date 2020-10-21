import axios from 'axios';
import React, { Component } from 'react';
import ArticleComments from './ArticleComments';



class ArticleContent extends Component {

  state = {
    article: {},
    isLoading: true,
  }

  componentDidMount() {
    axios.get(`https://stephen-fe-nc-news.herokuapp.com/api/articles/${this.props.article_id}`).then(({ data: { article } }) => {
      this.setState({ article, isLoading: false })
    })

  }

  render() {
    return (
      <>
        <h4>{this.state.article.title}</h4>
        <p>{this.state.article.body}</p>
        <ArticleComments article_id={this.props.article_id} />
      </>
    )
  }
}

export default ArticleContent;