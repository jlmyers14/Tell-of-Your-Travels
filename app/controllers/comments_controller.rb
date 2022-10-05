class CommentsController < ApplicationController

    def create
        @comment = Comment.new(comment_params)
        @comment.post_id = params[:post_id]
        @comment.user_id = params[:user_id]
        
        c = Comment.create!(comment_params)
        render json: c, status: :created
    end

    private
    def comment_params
        params.permit(:content)
    end
end
