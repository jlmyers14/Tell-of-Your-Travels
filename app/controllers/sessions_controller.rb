class SessionsController < ApplicationController
    before_action :authorized, except: [:create]

    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {
                error: {
                    login: 'Invalid username or password'
                },
            },
            status: :unauthorized
        end
    end

    def show
        user = User.find(params[:id])
        render json: user, status: :ok
    end

    def destroy
        session.delete :current_user
    end

end
