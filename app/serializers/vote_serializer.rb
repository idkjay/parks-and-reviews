class VoteSerializer < ActiveModel::Serializer
  attributes :id, :up, :down, :score

  def score
    object.down + object.up
  end
end
