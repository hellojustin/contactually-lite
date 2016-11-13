require 'rails_helper'

RSpec.describe ContactCollectionsController, type: :controller do

  describe 'a POST to #create with a CSV file' do
    let(:file) { fixture_file_upload 'files/data.csv' }
    let(:response) { post :create, upload: file, format: :json }

    it 'responds with 201' do
      expect(response).to have_http_status(:created)
    end
    it 'imports the contacts in the file' do
      response
      expect(Contact.count).to eq(200)
    end
  end

end
