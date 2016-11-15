require 'rails_helper'

RSpec.describe ContactCollectionsController, type: :controller do

  describe 'a POST to #create with a CSV file' do
    let(:file) { fixture_file_upload 'files/data.csv' }
    before { post :create, upload: file, format: :json }

    it 'responds with 201' do
      expect(response).to have_http_status(:created)
    end
    it 'imports the contacts in the file' do
      expect(Contact.count).to eq(200)
    end
  end

  describe 'a DELETE to #destroy with a list of ids' do
    let(:count) { 7 }
    let(:contacts) { create_list :contact, count }
    let(:ids) { contacts.map(&:id).join(',') }
    before { delete :destroy, id: ids, format: :json }

    it 'responds with 204' do
      expect(response).to have_http_status(:no_content)
    end
    it 'deletes the contact record for each id' do
      expect(Contact.count).to eq(0)
    end
  end

end
