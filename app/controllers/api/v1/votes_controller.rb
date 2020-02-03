class Api::V1::VotesController < ApplicationController
  def index
    review = Review.find(params["review_id"])
    render json: review.votes
  end

  def create
  end

  def update
  end
end
