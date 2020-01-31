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
      flash[:error] = "You do not have access to that page."
    end
  end
end
