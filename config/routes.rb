PhotoJar::Application.routes.draw do
  root to: "jars#index"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show, :destroy]
  resources :jars do
    resources :photos
  end
  resources :photos
end
