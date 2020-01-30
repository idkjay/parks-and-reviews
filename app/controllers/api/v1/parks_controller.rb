class Api::V1::ParksController < ApplicationController
  before_action :authorize_user, except: [:index]

  def index
    render json: Park.all
  end

  def create
    park = Park.create(park_params)
    # park.user = current_user
    if park.save
      render json: { park: park }
    else
      render json: { error: park.errors.full_messages }, status: :unprocessable_entity
    end
  end

  protected
  def authorize_user
    if !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

  def park_params
    params.permit(:name, :city, :state, :zip, :rating, :photo )
  end
end
