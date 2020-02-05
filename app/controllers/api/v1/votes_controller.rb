class Api::V1::VotesController < ApplicationController
  def index
    review = Review.find(params["review_id"])
    render json: review.votes
  end

  def create
    vote = Vote.new(vote_params)
  end

  private

  def vote_params
    params.require(:vote).permit(:user_id, :review_id)
  end
end
