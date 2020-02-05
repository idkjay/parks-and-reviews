class ParkSerializer < ActiveModel::Serializer
  attributes :id, :name, :state, :photo
end
