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
    error: false,
    page: 1
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
    const newTopic = prevProps.topic_slug !== this.props.topic_slug;
    const newSort = prevState.sort_by !== this.state.sort_by
    const newOrder = prevState.order !== this.state.order
    const newPage = prevState.page !== this.state.page;
    if (newTopic || newSort || newOrder || newPage) {
      this.fetchArticles();
    }
  }

  sortByAuthor = () => {
    this.setState(() => {
      return {
        sort_by: "author",
      }
    })
  }

  toggleOrder = (event) => {

    this.setState((currentState) => {
      return {
        order: currentState.order === "asc" ? "desc" : "asc",
      }
    })
  }


  setPage = (newPage) => {
    this.setState({ page: newPage });
  }


  render() {
    const { articles, isLoading, error, page } = this.state
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
              <section className="article-card" key={article.article_id}>
                <li key={article.article_id}>
                  <Link to={`/articles/${article.article_id}`} key={article.article_id}>
                    <p>{article.title}</p>
                  </Link>
                  <VoteUpdater votes={article.votes} article_id={article.article_id} />
                </li>
              </section>
            )
          })}
        </ul>
        <section>
          <button onClick={() => this.setPage(page - 1)}>{'<'}</button>
          <p>{page}</p>
          <button onClick={() => this.setPage(page + 1)}>{'>'}</button>
        </section>
      </>
    );
  }
}

export default ArticleList;


// toggleOrder = (event) => {
//   if (event.target.value === "desc")
//     this.setState(() => {
//       return {
//         order: "asc",
//       }
//     })
//   else (
//     this.setState(() => {
//       return {
//         order: "desc",
//       }
//     })
//   )
// }


// {
//   if (event.target.value === "desc")
//     this.setState(() => {
//       return {
//         order: "asc",
//       }
//     })
//   else (
//     this.setState(() => {
//       return {
//         order: "desc",
//       }
//     })
//   )
// }