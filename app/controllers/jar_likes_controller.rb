class JarLikesController < ApplicationController
  respond_to :json

  def create
    @jar_like = JarLike.new(params[:jar_like])
    if @jar_like.save
      render :json @jar_like
    else
      render :json @jar_like.errors, status: 422
    end
  end

  def destroy
    @jar_like = JarLike.find(params[:id])
    if @jar_like.destroy
      respond_to do |format|
        format.json { head :ok }
      end
    else
      respond_to do |format|
        @jar_like.errors, status: 422
      end
    end
  end

  def index
    @jar_likes = JarLike.find_by_jar_id(params[:id])
    render :json @jar_likes
  end
end
