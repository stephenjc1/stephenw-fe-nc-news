import React, { Component } from 'react';
import { Link } from "@reach/router";
import VoteUpdater from './VoteUpdater';
import { getArticles } from '../api';

class ArticleList extends Component {
  state = {
    articles: [],
    articleBody: "",
    isLoading: true,
    sort_by: "",
    order: "desc"
  }

  fetchArticles = () => {
    console.log("fetching")
    getArticles(this.props.topic_slug, this.state.sort_by, this.state.order)
      .then(({ data: { articles } }) => {
        this.setState({ articles, isLoading: false })
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
    const { articles } = this.state
    if (this.state.isLoading) return <p>Articles are loading up....</p>;
    return (
      <>
        <button onClick={this.sortByAuthor}>
          sort by author
          </button>
        <button onClick={this.toggleOrder} value={this.state.order}>
          order asc/desc
          </button>
        <section>
          {articles.map(article => {
            return (
              <>
                <Link to={`/articles/${article.article_id}`} key={article.article_id}>
                  <ul>{article.title}</ul>
                </Link>
                <VoteUpdater votes={article.votes} article_id={article.article_id} />
              </>
            )
          })}
        </section>
      </>
    );
  }
}

export default ArticleList;