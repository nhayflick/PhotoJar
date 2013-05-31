PhotoJar::Application.routes.draw do
  root to: "jars#index"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show, :destroy, :index]
  resources :jars do
    resources :photos, only: [:create, :index]
    resources :jar_likes, only: [:create, :destroy, :index]
  end
  resources :tags, only: [:create, :destroy, :index, :show]
  resources :photos, only: [:create, :index]
end
