class PhotosController < ApplicationController
  respond_to :json
  # respond_to :html, only: [:index]

  def create
    @photo = Photo.new(params[:photo])
    if @photo.save
      render json: @photo
    else
      render json: @photo.errors, status: 422
    end
  end

  def index
    @photos = Jar.find(params[:jar_id]).photos
    render json: @photos
  end

end
