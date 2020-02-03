Rails.application.routes.draw do
  root 'static_pages#index'

  get "/api/v1/parks/new", to: 'static_pages#create'
  get "/", to: 'static_pages#index'
  get "/parks", to: 'static_pages#index'
  get "/parks/:id", to: 'static_pages#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :parks, only: [:index, :show, :create] do
        resources :reviews, only: [:index, :create]
      end
    end
  end
end
