import axios from 'axios';
import React, { Component } from 'react';
import { Link } from "@reach/router";


class ArticleList extends Component {
  state = {
    articles: [],
    articleBody: "",
    isLoading: true,
  }

  fetchArticles = () => {
    axios.get('https://stephen-fe-nc-news.herokuapp.com/api/articles', { params: { topic: this.props.topic_slug } }).then(({ data: { articles } }) => {
      this.setState({ articles, isLoading: false })
    })
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic_slug !== this.props.topic_slug) {
      this.fetchArticles();
    }
  }

  render() {
    const { articles } = this.state
    if (this.state.isLoading) return <p>Articles are loading up....</p>;
    return (
      <>
        <main>
          {articles.map(article => {
            return <Link to={`/articles/${article.article_id}`} key={article.article_id}>
              <ul>{article.title}</ul> </Link>
          })}
        </main>
        <section>

        </section>
        {/* <Router>
          <ArticleContent path="/:article_id" />
        </Router> */}
      </>
    );
  }
}

export default ArticleList;