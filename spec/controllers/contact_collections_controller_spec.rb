require 'rails_helper'

RSpec.describe ContactCollectionsController, type: :controller do

  describe 'a POST to #create' do
    let(:file) { fixture_file_upload 'files/data.csv' }
    before do
      post :create, upload: file
    end

    # it 'responds with 201' do
    #   expect(response).to have_http_status(:created)
    # end
  end

end
