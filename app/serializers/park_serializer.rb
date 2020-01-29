class ParkSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :state, :zip, :rating, :photo
end
