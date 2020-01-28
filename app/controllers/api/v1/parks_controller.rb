class Api::V1::ParksController < ApplicationController
  def index
    render json: Park.all
  end
end
