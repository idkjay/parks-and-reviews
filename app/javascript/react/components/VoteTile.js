import React from 'react'

const VoteTile = props => {
  debugger
  let votes;
  if (props.votes.length == 0) {
    votes = 0
  } else {
    votes = props.votes[0].votes
  }
  // if (props.getVotes.length > 0) {
  //   props.getVotes.forEach (vote => {
  //     upvoteCount += vote.upvote
  //   })
  // }

  const handleClick = event => {
    event.preventDefault()
    props.handleVoteClick(event.currentTarget.id)
  }

  return(
    <div>
      <button id="upvote" onClick={handleClick}>Votes: {votes}</button>
    </div>
  )
}

export default VoteTile;
