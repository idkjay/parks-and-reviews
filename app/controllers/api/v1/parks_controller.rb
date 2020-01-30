class Api::V1::ParksController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
    render json: Park.all
  end

  def create
    park = Park.create(park_params)
    if park.save
      render json: { park: park }
    else
      render json: { error: park.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def authorize_user
    if !current_user || !current_user.admin?
      redirect_to root_path
    end
  end

  private
  def park_params
    params.permit(:name, :city, :state, :zip, :rating, :photo ) #try adding in require
  end
end
