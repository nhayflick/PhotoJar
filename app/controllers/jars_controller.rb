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
    @strippedParams = params[:jar]
    if @strippedParams[:tags_attributes]
      @strippedParams[:tags_attributes].each do |tag|
        tag.delete(:jar_id)
      end
    end
    puts(@strippedParams)
    if (@jar.user == current_user && @jar.update_attributes(@strippedParams))
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
