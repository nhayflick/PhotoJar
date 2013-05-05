class SessionsController < ApplicationController
  include SessionsHelper

  def new
  end

  def create
    user = User.find_by_email(params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      log_in user
      redirect_to "/#"
    else
      render 'new'
      flash[:error] = 'Invalid email/password combination'
    end
  end

  def destroy
    log_out
    redirect_to root_url
  end
end
