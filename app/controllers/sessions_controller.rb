class SessionsController < ApplicationController
  include SessionsHelper

  def new

  end

  def create
    @user = User.find_by_user_name(params[:user_name])
    if @user
      log_in(@user)
      redirect_to root_url
    else
      render new
      #needs error_message
    end
  end

  def destroy
    log_out
    redirect_to root_url
  end
end
