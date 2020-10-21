import axios from 'axios';
import React, { Component } from 'react';
import { Link } from "@reach/router";


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
    axios.get('https://stephen-fe-nc-news.herokuapp.com/api/articles', { params: { topic: this.props.topic_slug, sort_by: this.state.sort_by, order: this.state.order } }).then(({ data: { articles } }) => {
      this.setState({ articles, isLoading: false })
    })
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("updating");
    if (prevProps.topic_slug !== this.props.topic_slug || prevState.sort_by !== this.state.sort_by)
      this.fetchArticles();

  }


  sortByAuthor = () => {
    this.setState(() => {
      return {
        sort_by: "author",
      }
    })
  }

  render() {
    const { articles } = this.state
    if (this.state.isLoading) return <p>Articles are loading up....</p>;
    return (
      <>
        <button onClick={this.sortByAuthor}>
          sort by author
          </button>
        <main>
          {articles.map(article => {
            return <Link to={`/articles/${article.article_id}`} key={article.article_id}>
              <ul>{article.title}</ul> </Link>
          })}
        </main>
      </>
    );
  }
}

export default ArticleList;