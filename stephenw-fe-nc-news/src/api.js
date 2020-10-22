import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://stephen-fe-nc-news.herokuapp.com/api',
});

export const getArticles = (topic_slug, sort_by, order) => {
  return instance.get('/articles', { params: { topic: topic_slug, sort_by: sort_by, order: order } })
}

export const getArticleById = (article_id) => {
  return instance.get(`articles/${article_id}`)
}

export const increaseVotesById = (article_id, voteValue) => {
  return instance.patch(`/articles/${article_id}`, { inc_votes: voteValue })

}

export const postComment = (newComment, article_id) => {
  return instance.post(`articles/${article_id}/comments`, newComment)
}



// axios.get('https://stephen-fe-nc-news.herokuapp.com/api/articles', { params: { topic: this.props.topic_slug, sort_by: this.state.sort_by, order: this.state.order } })

// axios.get(`https://stephen-fe-nc-news.herokuapp.com/api/articles/${this.props.article_id}`)


// axios.patch(`https://stephen-fe-nc-news.herokuapp.com/api/articles/${this.props.article_id}`, { inc_votes: voteValue })