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

  describe "POST#create" do
    post_json = {
      name: "Mellowpebble",
      city: "Pablo",
      state: "Mellowfornia",
      zip: "1111",
      rating: 3,
      photo: "http://hellno.com"
    }
    bad_post_json = {
      name: "",
      city: "",
      state: "",
      zip: "",
      rating: "",
      photo: ""
    }

    let!(:admin_user) { FactoryBot.create(:admin_user) }

    context "when an admin is signed in and provides proper park params" do
      it "adds a new park to the database" do
        sign_in admin_user

        prev_count = Park.count

        post :create, params: post_json, format: :json

        expect(Park.count).to eq(prev_count + 1)
      end

      it "returns the new park as JSON" do
        sign_in admin_user

        post :create, params: post_json, format: :json

        response_body = JSON.parse(response.body)

        expect(response_body["park"].length).to eq 9
        expect(response_body["park"]["name"]).to eq "Mellowpebble"
        expect(response_body["park"]["city"]).to eq "Pablo"
        expect(response_body["park"]["state"]).to eq "Mellowfornia"
        expect(response_body["park"]["zip"]).to eq "1111"
        expect(response_body["park"]["rating"]).to eq 3
        expect(response_body["park"]["photo"]).to eq "http://hellno.com"
      end
    end


    context 'when a malformed request is made' do
      it 'does not persist data to database' do
        sign_in admin_user

        prev_count = Park.count

        post :create, params: bad_post_json, format: :json

        expect(Park.count).to eq prev_count
      end

      it 'returns validation errors' do
        sign_in admin_user

        post :create, params: bad_post_json, format: :json

        response_body = JSON.parse(response.body)

        expect(response_body["error"][0]).to eq "Name can't be blank"
        expect(response_body["error"][1]).to eq "City can't be blank"
        expect(response_body["error"][2]).to eq "State can't be blank"
        expect(response_body["error"][3]).to eq "Zip can't be blank"
        expect(response_body["error"][4]).to eq "Rating can't be blank"
        expect(response_body["error"][5]).to eq "Rating is not a number"
        expect(response_body["error"][6]).to eq "Photo can't be blank"
      end
    end
  end
end
