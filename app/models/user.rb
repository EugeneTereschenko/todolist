class User < ApplicationRecord
      has_secure_password
    
    has_many :projects, dependent: :destroy
    validates :first_name, :last_name, :email, :password_digest, presence: true
end
