import React, { Component } from 'react';
import axios from 'axios'
import { Link } from "@reach/router";


class NavBar extends Component {
  state = {
    topics: []
  }

  componentDidMount() {
    axios.get('https://stephen-fe-nc-news.herokuapp.com/api/topics')
      .then(({ data: { topics } }) => {
        this.setState({ topics });
      })
  }

  render() {
    const { topics } = this.state
    return (
      <nav>
        {topics.map(topic => {
          return <Link to={`/topics/${topic.slug}`} key={topic.slug}><button>{topic.slug}</button></Link>
        })}
      </nav>
    );
  }
}

export default NavBar;