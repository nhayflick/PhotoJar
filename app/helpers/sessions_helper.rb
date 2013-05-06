module SessionsHelper

  def current_user
    return nil if cookies[:remember_token].nil?
     @user ||= User.find_by_remember_token(cookies[:remember_token])
  end

  def log_in(user)
    cookies.permanent[:remember_token] = user.remember_token
    @user = user
  end

  def log_out
    cookies[:remember_token] = nil
    session[:user_name] = nil
  end

  def logged_in?
    not session[:user_name].nil?
  end
end
