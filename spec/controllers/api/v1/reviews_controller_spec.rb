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
    rating: 4
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

  describe "POST#create" do
    context "when a user is signed in and provides proper review params" do
      let!(:new_review) {{
          rating: 1,
          body: "Fake rating",
          park_id: test_park.id
        }}

      it "adds a new review to the database" do
        sign_in user_1

        prev_count = Review.count
        post :create, params: new_review, format: :json
        expect(Review.count).to eq(prev_count + 1)
      end

      it "returns the new review as JSON" do
        sign_in user_1

        post :create, params: new_review, format: :json
        response_body = JSON.parse(response.body)

        expect(response_body["review"].length).to eq 9
        expect(response_body["review"]["rating"]).to eq 1
        expect(response_body["review"]["body"]).to eq "Fake rating"
      end
    end

    context "When a user submits review without required params" do
      let!(:bad_post_json) {{
        rating: "",
        body: "",
        park_id: test_park.id
      }}

      it "adds does not add the new review to the database" do
        prev_count = Review.count
        post :create, params: bad_post_json, format: :json
        expect(Review.count).to eq(prev_count)
      end
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
