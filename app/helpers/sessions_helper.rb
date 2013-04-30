module SessionsHelper

  def current_user
    return nil if session[:user_name].nil?
    @user ||= User.find_by_user_name(session[:user_name])
  end

  def log_in(user)
    session[:user_name] = user.user_name
  end

  def log_out
    session[:user_name] = nil
  end

  def logged_in?
    not session[:user_name].nil?
  end
end
