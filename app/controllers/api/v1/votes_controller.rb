class Api::V1::VotesController < ApplicationController
  def index
    review = Review.find(params["review_id"])
    render json: review.votes
  end

  def create
    review = Review.find(params["review_id"])
    votes = Vote.where(review: params[:review_id])

    if votes.where(user: current_user).length == 0
      if votes.length >= 0
        if params[:_json] == "up"
         Vote.create(up: 1, down: 0, review: review, user: current_user)
        end

        if params[:_json] == "down"
          Vote.create(up: 0, down: -1, review: review, user: current_user)
        end
      end
    end
    
    render json: review.votes
  end
end
