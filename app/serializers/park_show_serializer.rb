class ParkShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :state, :zip, :rating, :description, :photo
end
