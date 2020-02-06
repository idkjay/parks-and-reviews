require "rails_helper"

RSpec.describe Api::V1::ParksController, type: :controller do
  let!(:test_park) { Park.create(
    name: "Yellowboulder",
    state: "Boulderado",
    description: "A fake one",
    photo: "http://dasjkdhas.com"
  ) }
  let!(:second_test_park) { Park.create(
    name: "Yellowpebble",
    state: "Pebblefornia",
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
      expect(returned_json["parks"][0]["state"]).to eq "Boulderado"
      expect(returned_json["parks"][0]["photo"]).to eq "http://dasjkdhas.com"

      expect(returned_json["parks"][1]["name"]).to eq "Yellowpebble"
      expect(returned_json["parks"][1]["state"]).to eq "Pebblefornia"
      expect(returned_json["parks"][1]["photo"]).to eq "http://hellyeah.com"
    end
  end

  describe "GET#show" do
    it "should return all the information for one park" do
      get :show, params: { id: test_park.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["park"].length).to eq 7

      expect(returned_json["park"]["name"]).to eq "Yellowboulder"
      expect(returned_json["park"]["state"]).to eq "Boulderado"
      expect(returned_json["park"]["description"]).to eq "A fake one"
      expect(returned_json["park"]["photo"]).to eq "http://dasjkdhas.com"
    end
  end

  describe "POST#create" do
    post_json = {
      name: "Mellowpebble",
      state: "Mellowfornia",
      description: "Another fake one",
      photo: "http://hellno.com"
    }

    bad_post_json = {
      name: "",
      state: "",
      description: "",
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
        expect(response_body["park"].length).to eq 7
        expect(response_body["park"]["name"]).to eq "Mellowpebble"
        expect(response_body["park"]["state"]).to eq "Mellowfornia"
        expect(response_body["park"]["photo"]).to eq "http://hellno.com"
        expect(response_body["park"]["description"]).to eq "Another fake one"
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
        expect(response_body["error"][1]).to eq "State can't be blank"
        expect(response_body["error"][2]).to eq "Description can't be blank"
        expect(response_body["error"][3]).to eq "Photo can't be blank"
      end
    end
  end
end
