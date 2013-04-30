PhotoJar::Application.routes.draw do
  root to: "jars#index"

  resource :session, only: [:new, :create, :destroy]
  resource :user, only: [:new, :create, :show, :destroy]
  resources :jars do
    resources :photos
  end
  resources :photos
end
