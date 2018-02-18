class Project < ApplicationRecord
    has_many :tasks, dependent: :destroy
    validates :name, presence: true,
                    length: { minimum: 1 }
    belongs_to :user
    
end
