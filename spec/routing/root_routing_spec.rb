require 'rails_helper'

RSpec.describe 'routes for Root', type: :routing do

  context 'application root' do
    it 'routes to contactually#index' do
      expect(get: root_path).to route_to(
        controller: 'contactually',
        action: 'index'
      )
    end
  end

end
