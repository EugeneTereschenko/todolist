class TasksController < ApplicationController
    before_action :require_user, only: [:index, :show]
    def create
        project = Project.find(params[:project_id]) 
        newPriority = project.tasks.length + 1
        task = project.tasks.create(params.require(:task).permit(:name, :status))
        task.update_attribute(:priority, newPriority)
        render json: task
    end
    def update
        task = Task.find(params[:id])
        task.update_attributes(params.require(:task).permit(:name, :status, :priority))
    end
    def destroy
        task = Task.find(params[:id])
        task.destroy
        render json: task
    end
    def show
        task = Task.find(params[:id])
        render json: task
    end
    def index
        project = Project.find(params[:project_id])
        render json: project.tasks.order(:priority)
    end
    
    def up
        project = Project.find(params[:project_id])
        taskcurrent = project.tasks.find(params[:task_id])
        prioritycurrent = taskcurrent.priority
        
        if prioritycurrent != 1
            priorityUp = prioritycurrent-1
            taskUp = project.tasks.find_by(priority: priorityUp) 
            taskcurrent.update_attribute(:priority, priorityUp)
            taskUp.update_attribute(:priority, prioritycurrent)
            render json: taskUp
        else
            render :json => { :errors => "errorspriority" }
        end
        
    end
    
    def down
        project = Project.find(params[:project_id])
        taskcurrent = project.tasks.find(params[:task_id])
        prioritycurrent = taskcurrent.priority
        maxpriority = project.tasks.maximum("priority")
        
        if prioritycurrent != maxpriority
            priorityDown = prioritycurrent+1
            taskDown = project.tasks.find_by(priority: priorityDown) 
            taskcurrent.update_attribute(:priority, priorityDown)
            taskDown.update_attribute(:priority, prioritycurrent)
            render json: taskDown
        else
            render  :json => { :errors => "errorspriority" }
        end
    end 
    
end
