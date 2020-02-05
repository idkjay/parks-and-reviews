require "rails_helper"

RSpec.describe Api::V1::ReviewsController, type: :controller do
  let!(:user_1) { FactoryBot.create(:user)}
  let!(:user_2) { FactoryBot.create(:user)}

  let!(:first_park_review) { Review.create(
      body: "Review for first park",
      rating: 2,
      user_id: user_1.id,
      park_id: test_park.id,
    )}

  let!(:test_park) { Park.create(
    name: "Yellowboulder",
    state: "Boulderado",
    description: "A fake one",
    photo: "http://dasjkdhas.com",
  ) }
  
  let!(:second_test_park) { Park.create(
    name: "Yellowpebble",
    state: "Pebblefornia",
    description: "Another fake one",
    photo: "http://hellyeah.com"
  ) }

  let!(:second_park_review) { Review.create(
    user_id: user_2.id,
    park_id: test_park.id,
    body: "Another review for first park",
    rating: 4,
    )}

  describe "GET#index" do
    it "should return a list of all the reviews for the park" do
      sign_in user_1

      get :index, params: { park_id: test_park.id, review_id: first_park_review.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["reviews"].length).to eq 2

      expect(returned_json["reviews"][0]["body"]).to eq "Review for first park"
      expect(returned_json["reviews"][0]["rating"]).to eq 2
      expect(returned_json["reviews"][0]["user_id"]).to eq user_1.id
      expect(returned_json["reviews"][0]["park_id"]).to eq test_park.id

      expect(returned_json["reviews"][1]["body"]).to eq "Another review for first park"
      expect(returned_json["reviews"][1]["rating"]).to eq 4
      expect(returned_json["reviews"][1]["user_id"]).to eq user_2.id
      expect(returned_json["reviews"][1]["park_id"]).to eq test_park.id
    end

    it "should not include reviews in the second park" do
      get :index, params: { park_id: second_test_park.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["reviews"].length).to eq 0
    end
  end

  describe "DELETE#destroy" do
    it "should delete the review" do
      sign_in user_1
      prev_count = Review.count

      delete :destroy, params: {park_id: test_park.id, review: first_park_review, id: first_park_review.id}, format: :json
      expect(Review.count).to eq(prev_count - 1)
    end
  end

  describe "PATCH#update" do
    it "should update the review" do
      sign_in user_2
      review_params = {
        body: "Edited body",
        rating: 5,
        park_id: test_park.id,
        id: second_park_review.id
      }
      put :update, params: review_params, format: :json
      updated_review = Review.find(second_park_review.id)
      expect(updated_review.body).to eq "Edited body"
    end
  end
end
