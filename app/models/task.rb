class Task < ApplicationRecord
  validates :name, presence: true,
                        length: { minimum: 1 }
  belongs_to :project
    
    after_destroy :update_priority    

        def update_priority

            project = Project.find(project_id)
            all_tasks = project.tasks
            all_tasks.all.each_with_index { |n, i| n.update_attribute(:priority, i+1) }

        end
    
end
