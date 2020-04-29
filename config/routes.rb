Rails.application.routes.draw do
  root to: 'books#index'
  resources :books, only: [:index]
  namespace :api do
    resources :books, only: [:show]
  end
end
