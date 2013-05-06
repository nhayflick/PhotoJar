class SessionsController < ApplicationController

  respond_to :json

  include SessionsHelper

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
    respond_to do |format|
      format.js { render :nothing => true }
      format.json { render json: "{}", :status => :ok}
    end
    log_out
  end
end
