import React, { Component } from 'react';
import { Link } from "@reach/router";
import VoteUpdater from './VoteUpdater';
import { getArticles } from '../api';
import Loader from './Loader';
import ErrorDisplay from './ErrorDisplay';

class ArticleList extends Component {
  state = {
    articles: [],
    articleBody: "",
    isLoading: true,
    sort_by: "",
    order: "desc",
    error: false
  }

  fetchArticles = () => {
    console.log("fetching")
    getArticles(this.props.topic_slug, this.state.sort_by, this.state.order)
      .then(({ data: { articles } }) => {
        this.setState({ articles, isLoading: false })
      })
      .catch(({ response }) => {
        console.dir(response);
        this.setState({
          error: { status: response.status, message: response.data.msg }
        })
      })
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("updating");
    if (prevProps.topic_slug !== this.props.topic_slug || prevState.sort_by !== this.state.sort_by || prevState.order !== this.state.order)
      this.fetchArticles();
  }

  sortByAuthor = () => {
    this.setState(() => {
      return {
        sort_by: "author",
      }
    })
  }

  toggleOrder = (event) => {
    if (event.target.value === "desc")
      this.setState(() => {
        return {
          order: "asc",
        }
      })
    else (
      this.setState(() => {
        return {
          order: "desc",
        }
      })
    )
  }

  render() {
    const { articles, isLoading, error } = this.state
    if (error) return (
      <ErrorDisplay {...error} />
    );
    if (isLoading) return <Loader />
    return (
      <>
        <button onClick={this.sortByAuthor}>
          sort by author
          </button>
        <button onClick={this.toggleOrder} value={this.state.order}>
          order asc/desc
          </button>
        <ul>
          {articles.map(article => {
            return (
              <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`} key={article.article_id}>
                  <p>{article.title}</p>
                </Link>
                <VoteUpdater votes={article.votes} article_id={article.article_id} />
              </li>
            )
          })}
        </ul>
      </>
    );
  }
}

export default ArticleList;