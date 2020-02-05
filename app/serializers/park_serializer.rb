class ParkSerializer < ActiveModel::Serializer
  attributes :id, :name, :state, :rating, :photo
end
