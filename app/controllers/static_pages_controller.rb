class StaticPagesController < ApplicationController

  def home
  end

  def graj
   if session[:user_id] == nil
     flash[:error] = "Aby zagrać, musisz być zalogowany."   
     redirect_to root_path
   end
   else   
     @user = User.find(session[:user_id])
  end

  def about
  end

  def contact
  end

  private

  def require_login
    unless logged_in?
      flash[:error] = "You must be logged in to access this section"
      redirect_to root_path # halts request cycle
    end
  end

end




