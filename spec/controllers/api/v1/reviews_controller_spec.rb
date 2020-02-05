require "rails_helper"

RSpec.describe Api::V1::ReviewsController, type: :controller do
<<<<<<< HEAD
  let!(:test_park) { Park.create(
    name: "Yellowboulder",
    city: "Boulder",
    state: "Boulderado",
    zip: "110110",
    rating: 1,
    description: "A fake one",
    photo: "http://dasjkdhas.com",
  ) }
  let!(:second_test_park) { Park.create(
    name: "Yellowpebble",
    city: "Pueblo",
    state: "Pebblefornia",
    zip: "999999",
    rating: 2,
    description: "Another fake one",
    photo: "http://hellyeah.com"
  ) }

  let!(:user_1) { FactoryBot.create(:user)}
  let!(:user_2) { FactoryBot.create(:user)}

  let!(:first_park_review) { Review.create(
      body: "Review for first park",
      rating: 2,
      user_id: user_1.id,
=======
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

    let!(:user_1) { FactoryBot.create(:user)}
    let!(:user_2) { FactoryBot.create(:user)}

    let!(:first_park_review) { Review.create(
        body: "Review for first park",
        rating: 2,
        user_id: user_1.id,
        park_id: test_park.id
      )}

    let!(:second_park_review) { Review.create(
      user_id: user_2.id,
>>>>>>> 718630040b245de57bb29d830b637f4ef5773078
      park_id: test_park.id,
    )}

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

      prev_count = Review.count

      Review.destroy(first_park_review.id)

      expect(Review.count).to eq(prev_count - 1)
    end
  end

  describe "PATCH#update" do
    it "should update the review" do

      second_park_review.update_attributes(rating: 5, body: "updated body")

      expect(second_park_review.body).to eq "updated body"
      expect(second_park_review.rating).to eq 5
    end
  end
end
