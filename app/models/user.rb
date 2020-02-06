class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :username, presence: true
  validates :profile_photo, presence: true

  has_many :reviews
  has_many :votes

  mount_uploader :profile_photo, ProfilePhotoUploader

  def admin?
    role == "admin"
  end
end
