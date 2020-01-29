require 'rails_helper'

RSpec.describe User, type: :model do

  describe "#admin?" do
    it "is not an admin if the role is not admin" do
      user = User.create(email: "yoyo@gmail.com", username: "yoyo", role: "member")
      expect(user.admin?).to eq(false)
    end

    it "is an admin if the role is admin" do
      user = User.create(email: "yoyo@gmail.com", username: "yoyo", role: "admin")
      expect(user.admin?).to eq(true)
    end
  end
end
