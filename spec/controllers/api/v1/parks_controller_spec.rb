require "rails_helper"

RSpec.describe Api::V1::ParksController, type: :controller do
  let!(:test_park) { Park.create(
    name: "Yellowboulder",
    city: "Boulder",
    state: "Boulderado",
    zip: "110110",
    rating: 1,
    photo: "http://dasjkdhas.com"
  ) }
  let!(:second_test_park) { Park.create(
    name: "Yellowpebble",
    city: "Pueblo",
    state: "Pebblefornia",
    zip: "999999",
    rating: 2,
    photo: "http://hellyeah.com"
  ) }

  describe "GET#index" do
    it "should return a list of all the parks" do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["parks"].length).to eq 2

      expect(returned_json["parks"][0]["name"]).to eq "Yellowboulder"
      expect(returned_json["parks"][0]["city"]).to eq "Boulder"
      expect(returned_json["parks"][0]["state"]).to eq "Boulderado"
      expect(returned_json["parks"][0]["zip"]).to eq "110110"
      expect(returned_json["parks"][0]["rating"]).to eq 1
      expect(returned_json["parks"][0]["photo"]).to eq "http://dasjkdhas.com"

      expect(returned_json["parks"][1]["name"]).to eq "Yellowpebble"
      expect(returned_json["parks"][1]["city"]).to eq "Pueblo"
      expect(returned_json["parks"][1]["state"]).to eq "Pebblefornia"
      expect(returned_json["parks"][1]["zip"]).to eq "999999"
      expect(returned_json["parks"][1]["rating"]).to eq 2
      expect(returned_json["parks"][1]["photo"]).to eq "http://hellyeah.com"
    end
  end

  describe "POST#create" do
      # new_park = Park.new(
      #   name: "Park spot",
      #   city: "Park city",
      #   state: "Park state",
      #   zip:"4567",
      #   rating: 2,
      #   photo: "http://photo.com"
      # ).to_json
      #
      # let!(:new_park_hash) { Park.new(
      #   name: "Mellowpebble",
      #   city: "Pablo",
      #   state: "Mellowfornia",
      #   zip: "111111",
      #   rating: 3,
      #   photo: "http://hellno.com"
      # ) }


    it "adds a new park to the database" do
      post_json = {
        name: "Mellowpebble",
        city: "Pablo",
        state: "Mellowfornia",
        zip: "1111",
        rating: 3,
        photo: "http://hellno.com"
      }.to_json

      prev_count = Park.count
      post(:create, body: post_json)
      binding.pry
      expect(Park.count).to eq(prev_count + 1)
    end
  end
end
