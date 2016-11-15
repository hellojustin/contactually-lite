require 'rails_helper'

RSpec.describe ContactsController, type: :controller do

  describe 'a GET to #index' do
    let(:count) { 7 }
    let(:contacts) { create_list :contact, count }
    before do
      contacts
      get :index, format: :json
    end

    it 'responds with 200' do
      expect(response).to have_http_status(:ok)
    end
    it 'responds with json' do
      expect(response.content_type).to eq('application/json')
    end
    it 'returns a list of contacts' do
      response_data = JSON.parse response.body
      expect(response_data.size).to equal(count)
    end
  end

  describe 'a DELETE to #destroy' do
    let(:contact) { create :contact }
    before { delete :destroy, id: contact.id, format: :json }

    it 'responds with 204' do
      expect(response).to have_http_status(:no_content)
    end
    it 'deletes the contact' do
      expect(Contact.count).to eq(0)
    end
  end

end
