require 'test_helper'

class TasksControllerTest < ActionDispatch::IntegrationTest

    test "not autorized user login redirected to log in page" do
    get "/projects/32/tasks/32"
    assert_response :redirect
    end
    
    
end


