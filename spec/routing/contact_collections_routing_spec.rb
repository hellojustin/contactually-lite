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

  context 'destroy contact_collections' do
    let(:route) { '/contact_collections/1' }
    let(:expected_route) do
      {
        controller: 'contact_collections',
        action: 'destroy',
        id: '1',
        format: :json
      }
    end
    it 'Routes to contact_collections#destroy' do
      expect(delete: route).to route_to(expected_route)
    end
  end

end
