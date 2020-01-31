class ParkSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :state, :rating, :photo

  has_many :reviews
end
