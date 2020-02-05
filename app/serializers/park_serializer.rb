class ParkSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :state, :rating, :photo, :average

  def average
    review_total = []
    object.reviews.each do |review|
      review_total << review.rating
    end
    if review_total.length > 0
      review_average = review_total.sum.to_f / review_total.length
      review_average.round(1)
    else
      review_total
    end
  end
end
