import React from "react"

const VoteTile = props => {
  let votes;
  if (props.votes.length === 0) {
    votes = 0
  } else {
    votes = props.votes[0].votes
  }

  // if (props.getVotes.length > 0) {
  //   props.getVotes.forEach (vote => {
  //     upvoteCount += vote.upvote
  //   })
  // }

  const handleUpvoteClick = event => {
    event.preventDefault()
    props.handleVoteClick(event.currentTarget.id)
  }

  const handleDownvoteClick = event => {
    event.preventDefault()
    props.handleVoteClick(event.currentTarget.id)
  }

  return(
    <div>
      <i id="upvote" className="fa fa-tree up" onClick={handleUpvoteClick}></i>
      {votes}
      <i id="downvote" className="fa fa-tree down" onClick={handleDownvoteClick}></i>
    </div>
  )
}

export default VoteTile;
