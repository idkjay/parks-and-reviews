require "rails_helper"

RSpec.describe Api::V1::ParksController, type: :controller do
  let!(:test_park) { Park.create(
    name: "Yellowboulder",
    city: "Boulder",
    state: "Boulderado",
    zip: "110110",
    rating: 1,
    description: "A fake one",
    photo: "http://dasjkdhas.com"
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
      expect(returned_json["parks"][0]["rating"]).to eq 1
      expect(returned_json["parks"][0]["photo"]).to eq "http://dasjkdhas.com"

      expect(returned_json["parks"][1]["name"]).to eq "Yellowpebble"
      expect(returned_json["parks"][1]["city"]).to eq "Pueblo"
      expect(returned_json["parks"][1]["state"]).to eq "Pebblefornia"
      expect(returned_json["parks"][1]["rating"]).to eq 2
      expect(returned_json["parks"][1]["photo"]).to eq "http://hellyeah.com"
    end
  end

  describe "GET#show" do
    it "should return all the information for one park" do
      get :show, params: { id: test_park.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["park"].length).to eq 9

      expect(returned_json["park"]["name"]).to eq "Yellowboulder"
      expect(returned_json["park"]["city"]).to eq "Boulder"
      expect(returned_json["park"]["state"]).to eq "Boulderado"
      expect(returned_json["park"]["rating"]).to eq 1
      expect(returned_json["park"]["description"]).to eq "A fake one"
      expect(returned_json["park"]["photo"]).to eq "http://dasjkdhas.com"
    end
  end
end
