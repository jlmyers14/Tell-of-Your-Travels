class PostsController < ApplicationController
    
    def country_images
        p = Post.where(params[:id])
        render json: p
    end

    def index
        render json: Post.all
    end

    def show
        p = Post.find(params[:id])
        render json: p
    end

    def posts_by_country
        p = Post.where(params[:country_id])
        render json: p
    end

    def create
        p = Post.create!(post_params)
        render json: p, status: :created
    end

    def update
        p = Post.find(params[:id])
        p.update!(post_params)
        render json: p
    end

    def destroy
        p = Post.find(params[:id])
        p.destroy
        head :no_content
    end

    def posts_by_country
        render json: Post.where(country_id: params[:id])
    end

    private
    def post_params
        params.permit(:user_id, :country_id, :country_code, :content, :category, :image, :city)
    end

end
