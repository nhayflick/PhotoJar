class JarsController < ApplicationController
  respond_to :json
  respond_to :html, only: [:index]

  include SessionsHelper

  def index
    @user_jars = Jar.all(include: [:photos, :jar_likes])
    respond_to do |format|
      format.html {render :index}
      format.json {render :json => @user_jars}
    end
  end

  def create
    # Handles cases where the list of tags is empty
    @strippedParams = params[:jar]
    if @strippedParams[:tags_attributes] == nil
      @strippedParams.delete(:tags_attributes)
    end
    @jar = Jar.new(@strippedParams)
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
    # Handles cases where the list of tags is empty
    @jar = Jar.find(params[:id])
    @strippedParams = params[:jar]
    if @strippedParams[:tags_attributes] == nil
      @strippedParams.delete(:tags_attributes)
    end
    puts(@strippedParams)
    # Authenticates that the current user has permission to edit this jar
    if (@jar.user == current_user && @jar.update_attributes(@strippedParams))
      render json: @jar
    else
      render json: @jar.errors, status: 422
    end
  end

  def show
    @jar = Jar.find(params[:id]).includes([:photos, :jar_likes])
    render json: @jar
  end
end
