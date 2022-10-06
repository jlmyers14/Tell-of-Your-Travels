class UsersController < ApplicationController

rescue_from ActiveRecord::RecordInvalid, with: :invalid

    def index
        render json: User.all
    end
    
    def create
        new_user = User.create!(user_params)
        render json: new_user, status: :created
    end

    def show
        u = User.find_by(id: session[:current_user])
        render json: {"user" => "here"}, status: :ok
    end

    def update
        u = User.find(params[:id])
        u.update!(user_params)
        render json: u
    end

    private
    def user_params
        params.permit(:username, :password)
    end

    def invalid
        render json: {errors: "User not found in database"}
    end
end
