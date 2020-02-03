class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :park_id, :rating, :body

  belongs_to :user, if: :current_user?
  belongs_to :park

  def current_user?
    object.user == scope
  end
end
