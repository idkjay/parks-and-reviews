class Api::V1::ReviewsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
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
        render json: { review: review }
      else
        render json: { error: review.errors.full_messages }, status: :unprocessable_entity
      end
    else
      redirect_to root_path
    end
  end

  private

  def review_params
    params.permit(:rating, :body)
  end
end
