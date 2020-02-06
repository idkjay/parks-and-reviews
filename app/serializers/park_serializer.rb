class ParkSerializer < ActiveModel::Serializer
  attributes :id, :name, :state, :photo, :average, :reviews

  has_many :reviews

  def average
    review_total = []
    object.reviews.each do |review|
      review_total << review.rating
    end
    if review_total.length > 0
      review_average = review_total.sum.to_f / review_total.length
      review_average.round(1)
      "#{review_average.round(1)}/5 stars"
    else
      return "Not Yet Rated"
    end
  end
end
