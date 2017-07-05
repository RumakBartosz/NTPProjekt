class UsersController < ApplicationController

  def index
    @user = User.all
    ordered_users = @user.order(:created_at)
    with_users_key = {"users" => ordered_users.as_json(only: [:id, :rank])}
    render json: with_users_key
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    with_users_key = {"user" => @users.as_json(only: [:id, :rank])}
    render json: with_users_key
  end

  def show
    @user = User.find(params[:id])
    @placement = User.order(:rank) 
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      flash[:success] = "Witaj!"
      redirect_to @user
    else
      render 'new'
    end
  end


  private

    def user_params
      params.require(:user).permit(:name, :email, :password,
                                   :password_confirmation, :rank)
    end
end
