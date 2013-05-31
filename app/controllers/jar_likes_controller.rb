class JarLikesController < ApplicationController
  respond_to :json

  def create
    @jar_like = JarLike.new(jar_id: params[:jar_id].to_i, user_id: params[:user_id].to_i)
    if @jar_like.save
      render json: @jar_like
    else
      render json: @jar_like.errors, status: 422
    end
  end

  def destroy
    @jar_like = JarLike.find(params[:id])
    if @jar_like.destroy
      render json: {:success => true}
    else
      render json: @jar_like.errors, status: 422
    end
  end

  def index
    @jar_likes = JarLike.find_by_jar_id(params[:jar_id])
    render json: @jar_likes
  end
end
