class ParksController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
    render json: Park.all
  end

  def new
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

  def authorize_user
    if !current_user || !current_user.admin?
      # flash[:notice] = "You do not have access to this page."
      redirect_to root_path
    end
  end

  def park_params
    params.permit(:name, :city, :state, :zip, :rating, :photo )
  end
end
