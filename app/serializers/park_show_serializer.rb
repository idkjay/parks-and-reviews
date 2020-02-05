class ParkShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :state, :description, :photo

  has_many :reviews
end
