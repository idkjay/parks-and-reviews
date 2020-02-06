class VoteSerializer < ActiveModel::Serializer
  attributes :id, :up, :down
end
