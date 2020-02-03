require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "users#{n}@example.com" }
    sequence(:username) {|n| "Beth#{n}"}
    password { 'password' }
    password_confirmation { 'password' }
    profile_photo { Rack::Test::UploadedFile.new(Rails.root.join('spec/support/images/photo.png'), 'image/png') }
  end
end
