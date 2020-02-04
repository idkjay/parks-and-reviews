class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :park_id, :rating, :body, :votes

  belongs_to :user, if: :current_user?
  belongs_to :park

  def current_user?
    object.user == scope
  end

  def votes
    object.votes
  end
end
