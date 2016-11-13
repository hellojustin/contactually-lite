require 'rails_helper'

RSpec.describe 'routes for ContactCollections', type: :routing do

  context 'create contact_collections' do
    it 'Routes to contact_collections#create' do
      expect(post: contact_collections_path).to route_to(
        controller: 'contact_collections',
        action: 'create',
        format: :json
      )
    end
  end

end
