class JarsController < ApplicationController
  respond_to :json
  respond_to :html, only: [:index]

  include SessionsHelper

  def index
    @user_jars = Jar.all
    respond_to do |format|
      format.html {render :index}
      format.json {render :json => @user_jars}
    end
    #currently only grabs the logged_in user's jars
  end

  def create
    @jar = Jar.new(params[:jar])
    if @jar.save
      render json: @jar
    else
      render json: @jar.errors, status: 422
    end
  end

  def destroy
    @jar = Jar.find(params[:id])
    if @jar.destroy
      #?
    else
      render json: @jar.errors, status: 422
    end
  end

  def update
    @jar = Jar.find(params[:id])
    @jar.assign_attributes(params[:jar].except(:created_at, :image_content_type, :image_file_name, :image_file_size, :image_updated_at, :updated_at))
    if (@jar.user == current_user && @jar.save)
      render json: @jar
    else
      render json: @jar.errors, status: 422
    end
  end

  def show
    @jar = Jar.find(params[:id])
    render json: @jar
  end
end
