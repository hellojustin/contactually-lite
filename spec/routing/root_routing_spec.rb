require 'rails_helper'

RSpec.describe 'routes for Root', type: :routing do

  context 'application root' do
    it 'routes to contacts#index' do
      expect(get: root_path).to route_to(
        controller: 'contacts',
        action: 'index'
      )
    end
  end

end
