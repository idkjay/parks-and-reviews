class ParkShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :state, :rating, :description, :photo

  has_many :reviews
end
