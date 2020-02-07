class VoteSerializer < ActiveModel::Serializer
  attributes :id, :up, :down, :score

end
