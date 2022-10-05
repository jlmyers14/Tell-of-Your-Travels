Rails.application.routes.draw do
  
  resources :comments
  resources :favorites
  resources :posts
  resources :countries
  resources :users
  resources :create_users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!

  # Country Routes
  get "/all_countries", to: "countries#all_countries"
  get "/country_code", to: "countries#country_code"
  
  # Posts Routes
  delete "/remove", to: "posts#destroy"
  get "/posts/country/code", to: "posts#posts_by_country"
  get "/posts/images", to: "posts#country_images" 
  get "posts_by_country", to: "posts#posts_by_country"
  
  # Sessions Routes
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Users Routes
  get "/me", to: "users#show"
  patch "/update_profile", to: "users#update"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
