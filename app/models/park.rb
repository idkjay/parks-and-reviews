class Park < ApplicationRecord
  validates :name, presence: true
  validates :state, presence: true
  validates :rating, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 5}
  validates :description, presence: true
  validates :photo, presence: true
  
  has_many :reviews
end
