import React from "react"

const VoteTile = props => {
  let upvote = 0
  let downvote = 0
  // if (props.votes.length > 0) {
  //   props.votes.forEach(vote => {
  //     upvote += vote.up
  //     downvote += vote.down
  //   })
  // }

  // const handleUpvoteClick = event => {
  //   vote += 1
  //   setVotes(vote)
  // }
  //
  // const handleDownvoteClick = event => {
  //   vote -= 1
  //   setVotes(vote)
  // }

  // props.votes is empty array that needs to be change on click.

  const handleClick = event => {
    event.preventDefault()
    if (event.currentTarget.id === "upvote") {
      props.handleVoteClick(props.votes.count = 1)
    } else if (event.currentTarget.id === "downvote") {
      props.handleVoteClick(props.votes.count = -1)
    }
  }

  return(
    <div>
      <i id="upvote" className="fa fa-tree up" onClick={handleClick}></i>

      <i id="downvote" className="fa fa-tree down" onClick={handleClick}></i>
    </div>
  )
}

export default VoteTile;
