require 'rails_helper'

RSpec.describe 'routes for Contacts', type: :routing do

  context 'contacts' do
    it 'routes to ContactsController#index' do
      expect(get: contacts_path).to route_to(
        controller: 'contacts',
        action: 'index'
      )
    end
  end

end
