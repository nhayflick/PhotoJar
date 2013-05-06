class TagsController < ApplicationController
  respond_to :json

  def index
    @tags = Tag.all
    render json: @tags
  end

  def show
    @tag = Tag.find(params[:id])
    render json: @tag
  end
end
