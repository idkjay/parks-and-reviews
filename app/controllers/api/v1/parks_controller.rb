class Api::V1::ParksController < ApplicationController
  before_action :authenticate_user!, only: [:create]

  def index
    render json: Park.all
  end

  def show
    render json: Park.find(params["id"]), serializer: ParkShowSerializer
  end

  def create
    park = Park.create(park_params)
    if park.save
      render json: { park: park }
    else
      render json: { error: park.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def park_params
    params.permit(:name, :state, :photo, :description)
  end
end
