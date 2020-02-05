class Park < ApplicationRecord
  validates :name, presence: true
  validates :state, presence: true
  validates :description, presence: true
  validates :photo, presence: true

  has_many :reviews
end
