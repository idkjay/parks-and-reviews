class Api::V1::VotesController < ApplicationController
  def index
    review = Review.find(params["review_id"])
    render json: review.votes
  end

  def create
    review = Review.find(params["review_id"])
    current_user_vote = Vote.where('user_id =? AND review_id=?', current_user, review).first

    if current_user_vote
      if current_user_vote.up == 1 && current_user_vote.down == 0
        if params[:_json] == "up"
          current_user_vote.up = 0
        elsif params[:_json] == "down"
          current_user_vote.up = 0
          current_user_vote.down = 1
        end
      elsif current_user_vote.up == 0 && current_user_vote.down == 1
        if params[:_json] == "down"
          current_user_vote.down = 0
        elsif params[:_json] == "up"
          current_user_vote.up = 1
          current_user_vote.down = 0
        end
      elsif current_user_vote.up == 0 && current_user_vote.down == 0
        if params[:_json] == "up"
          current_user_vote.up = 1
        elsif params[:_json] == "down"
          current_user_vote.down = 1
        end
      end
      current_user_vote.save
    else
      if params[:_json] == "up"
        vote = Vote.new(up: 1, down: 0, review: review, user: current_user)
      elsif params[:_json] == "down"
        vote = Vote.new(up: 0, down: 1, review: review, user: current_user)
      end
      vote.save
    end
    render json: review.votes
  end

  private
  #
  def vote_params
    params.require(:vote).permit(:park_id, :user_id, :review_id)
  end
end
