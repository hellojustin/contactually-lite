require 'rails_helper'

RSpec.describe ContactuallyController, type: :controller do

  describe 'a GET to #index' do
    let(:count) { 7 }
    let(:contacts) { create_list :contact, count }
    before do
      contacts
      get :index
    end

    it 'responds with 200' do
      expect(response).to have_http_status(:ok)
    end
    it 'sets the @contacts variable' do
      expect(assigns(:contacts)).to eq(contacts)
    end
    it 'renders the index template' do
      expect(response).to render_template(:index)
    end
  end

end
