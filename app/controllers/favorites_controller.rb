class FavoritesController < ApplicationController

    def create
        @like = current_user.likes.new(post_id: params[:post_id])
        like = Favorites.create!
        render json: like, status: :created
    end
    
end
