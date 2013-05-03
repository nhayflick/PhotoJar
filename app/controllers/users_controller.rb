class UsersController < ApplicationController
  respond_to :json

  include SessionsHelper

  def index
    @users = User.all
    render json: @users
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      log_in @user
      redirect_to root_url
    else
      render 'new'
    end
  end

  def show
    user = User.find(params[:id])
    render json: user
  end
end
