require 'rails_helper'

RSpec.describe 'routes for ContactsCollection', type: :routing do

  context 'create_contacts_collection' do
    it 'Routes to contacts_collection#create' do
      expect(post: contacts_collection_index_path).to route_to(
        controller: 'contacts_collection',
        action: 'create'
      )
    end
  end

end
