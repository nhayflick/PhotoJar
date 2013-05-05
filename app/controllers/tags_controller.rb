class TagsController < ApplicationController
  respond_to :json

  def index
    @tags = Tag.all
    render json: @tags
  end
  
end
