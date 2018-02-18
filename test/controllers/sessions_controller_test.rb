require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
    
       include Devise::Test::IntegrationHelpers
  # test "the truth" do
  #   assert true
  # end
#    test "authenticated user should get index" do
#        sign_in users(:one)
#        get "/projects/32"
#        assert_response :success
#    end
    
    test "authenticated user should get index" do
        user = users(:one)
       @request.env["devise.mapping"] = Devise.mappings[:user]
    sign_in users(:one)
        get "/projects/32"
        assert_response :success    
    end
end
