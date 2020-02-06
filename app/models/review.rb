class Review < ApplicationRecord
  belongs_to :user
  belongs_to :park
  has_many :votes

  validates :rating, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 5}
  validates :body, presence: true

  # def score
  #   votes.each do |vote|
  #     total = vote.down + vote.up
  #     return total
  #     binding.pry
  #   end
  # end
end
