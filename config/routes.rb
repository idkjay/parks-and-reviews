Rails.application.routes.draw do
  root 'static_pages#index'

  get "/parks/new", to: 'static_pages#create'
  get "/", to: 'static_pages#index'
  get "/parks", to: 'static_pages#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :parks, only: [:index, :create]
    end
  end
  resources :parks, only: [:new, :create]
end
