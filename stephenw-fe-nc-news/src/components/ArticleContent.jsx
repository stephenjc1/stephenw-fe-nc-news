import React, { Component } from 'react';
import { getArticleById } from '../api';
import ArticleComments from './ArticleComments';
import VoteUpdater from './VoteUpdater';



class ArticleContent extends Component {

  state = {
    article: {},
    isLoading: true,
  }

  componentDidMount() {
    getArticleById(this.props.article_id)
      .then(({ data: { article } }) => {
        this.setState({ article, isLoading: false })
      })
  }

  render() {
    return (
      <>
        <h4>{this.state.article.title}</h4>
        <p>{this.state.article.body}</p>
        <ArticleComments article_id={this.props.article_id} />
        <VoteUpdater votes={this.state.article.votes} article_id={this.state.article.article_id} />
      </>
    )
  }
}

export default ArticleContent;