class StaticPagesController < ApplicationController
  before_action :authorize_user, only: [:create]

  def index
  end

  def create
  end

  protected
  def authorize_user
    if !current_user || !current_user.admin?
      redirect_to root_path
    end
  end
end
