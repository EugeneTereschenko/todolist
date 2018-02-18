Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    
    root 'static_pages#index'
    
    resources :projects do
        resources :tasks do
                    get 'up'  => 'tasks#up'
                    get 'down'  => 'tasks#down'
            end
        end
    
    get 'signup'  => 'users#new' 
    resources :users
  
    get '/login' => 'sessions#new'
    post 'login' => 'sessions#create'
    
    get '/login' => 'sessions#new'
    post 'login' => 'sessions#create'
    
    delete 'logout' => 'sessions#destroy'
end
