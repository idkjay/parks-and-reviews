class ParkShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :state, :zip, :rating, :description, :photo

  has_many :reviews
end
