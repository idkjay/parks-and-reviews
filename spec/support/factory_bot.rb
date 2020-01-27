require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    sequence(:username) {|n| "Beth#{n}"}
    password { 'password' }
    password_confirmation { 'password' }
  end

end
