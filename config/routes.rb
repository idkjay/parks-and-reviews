Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :parks, only: [:index, :show] do
        resources :reviews, only: [:index, :create, :destroy]
      end
    end
  end

  get '/parks', to: 'static_pages#index'
  get '/parks/:id', to: 'static_pages#index'
end
