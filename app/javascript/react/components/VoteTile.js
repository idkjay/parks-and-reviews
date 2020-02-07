import React from "react"

const VoteTile = props => {
  let upvoteCount = 0
  let downvoteCount = 0

  if (props.votes.length > 0) {
    props.votes.forEach(vote => {
      upvoteCount += vote.up
      downvoteCount += vote.down
    })
  }

  const handleClick = event => {
    event.preventDefault()
    props.handleVoteClick(event.currentTarget.id)
  }

  return(
    <div className="votetile">
      {upvoteCount} <i id="up" className="fa fa-tree up" onClick={handleClick}></i> 
      <i id="down" className="fa fa-tree down" onClick={handleClick}></i> {downvoteCount}
    </div>
  )
}

export default VoteTile;
