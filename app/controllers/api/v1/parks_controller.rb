class Api::V1::ParksController < ApplicationController
  def index
    render json: Park.all
  end

  def show
    render json: Park.find(params["id"]), serializer: ParkShowSerializer
  end
end
