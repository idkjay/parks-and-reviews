class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :park_id, :rating, :body, :username, :current_username, :votes

  belongs_to :user, if: :current_user?
  belongs_to :park

  def username
    if current_user?
      object.user.username
    end
  end

  def current_user?
    object.user == scope
  end

  def votes
    object.votes
  end

  def current_username
    if current_user?
      scope.username
    end
  end
end
