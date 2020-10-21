import React, { Component } from 'react';
import { increaseVotesById } from '../api';

class VoteUpdater extends Component {
  state = {
    userVotes: 0,
  };

  //voteValue represenets what we invoke handleVote with in our onClick (1 or -1).  This is passed into an anonymous function, which is in fact invoked with 'event'.

  //catch will revert to previous vote if the axios request fails

  handleVote = (voteValue) => {
    this.setState((currentState) => {
      return { userVotes: currentState.userVotes + voteValue }
    });

    increaseVotesById(this.props.article_id, voteValue).catch(() => {
      this.setState((currentState) => {
        return { userVotes: currentState.userVotes - voteValue }
      })
    })
  }

  render() {
    const { votes } = this.props;
    const { userVotes } = this.state;
    return (
      <>
        <button onClick={() => this.handleVote(1)} value={1}>VOTE UP!</button>
        <p>Votes: {votes + userVotes}</p>
        <button onClick={() => this.handleVote(-1)} value={-1}>VOTE DOWN!</button>
      </>
    );
  }
}

export default VoteUpdater;