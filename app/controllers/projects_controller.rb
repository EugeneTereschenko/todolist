class ProjectsController < ApplicationController
    before_action :require_user, only: [:index, :show]
    def index
        user = User.find_by_id(session[:user_id])
        render json: user.projects
    end
    def create    
        user = User.find_by_id(session[:user_id])
        project = user.projects.create(params.require(:project).permit(:name))
        render json: project
        
    end 
    def destroy
        user = User.find_by_id(session[:user_id])
        project = user.projects.find(params[:id])
        project.destroy
        render json: project
    end
    def update
       project = Project.find(params[:id])
       project.update_attributes(params.require(:project).permit(:name))
       render json: project
    end
    def show 
      project = Project.find(params[:id])
      render json: project
    end    
end
