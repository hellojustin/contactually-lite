require 'rails_helper'

RSpec.describe ContactsController, type: :controller do

  describe 'a GET to #index' do
    let(:count) { 7 }
    let(:contacts) { FactoryGirl.create_list(:contact, count) }
    before do
      contacts
      get :index, format: :json
    end

    it 'responds with 200' do
      expect(response.status).to eq(200)
    end
    it 'responds with json' do
      expect(response.content_type).to eq('application/json')
    end
    it 'returns a list of contacts' do
      response_data = JSON.parse response.body
      expect(response_data.size).to equal(count)
    end
  end

end
