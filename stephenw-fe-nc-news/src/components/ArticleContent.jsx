import React, { Component } from 'react';
import { getArticleById } from '../api';
import ArticleComments from './ArticleComments';
import Loader from './Loader';
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
    const { article, isLoading } = this.state
    if (isLoading) return <Loader />
    return (
      <>
        <h4>{article.title}</h4>
        <p>{article.body}</p>
        <ArticleComments article_id={this.props.article_id} />
        <VoteUpdater votes={article.votes} article_id={article.article_id} />
      </>
    )
  }
}

export default ArticleContent;