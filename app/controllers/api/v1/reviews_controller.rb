class Api::V1::ReviewsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  protect_from_forgery unless: -> { request.format.json? }

  def index
    park = Park.find(params["park_id"])
    render json: park.reviews
  end

  def create
    if user_signed_in?
      review = Review.new(review_params)
      review.user = current_user
      park = Park.find(params["park_id"])
      review.park = park

      if review.save
        render json: review
      else
        render json: review.errors.full_messages.to_sentence
      end
    else
      redirect_to root_path
    end
  end

  def destroy
    park = Park.find(params["park_id"])
    review = Review.find(params["id"])

    if current_user == review.user
      review.destroy
      render json: park.reviews
    else
      render json: park.reviews
    end
  end

  def update
    park = Park.find(params["park_id"])
    review = Review.find(params["id"])

    if current_user == review.user
      review.update_attributes(review_params)
      render json: park.reviews
    else
      render json: park.reviews
    end
  end

  private

  def review_params
    params.permit(:rating, :body, :id)
  end
end
