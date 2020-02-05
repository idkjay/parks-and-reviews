import React, { useState } from "react"

const VoteTile = props => {
  const [ votes, setVotes ] = useState(0)
  let vote = 0

  const handleUpvoteClick = event => {
    vote += 1
    setVotes(vote)
  }

  const handleDownvoteClick = event => {
    vote -= 1
    setVotes(vote)
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
