class Api::V1::VotesController < ApplicationController
  def index
    review = Review.find(params["review_id"])
    render json: review.votes
  end

  def create
    binding.pry
    vote = Vote.new(vote_params)
    user = current_user
    review = Review.find(params["review_id"])
    # binding.pry
  end

  private
  #
  def vote_params
    params.require(:vote).permit(:park_id, :user_id, :review_id)
  end
end
