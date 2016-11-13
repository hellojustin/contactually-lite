require 'rails_helper'

describe ContactCollection, type: :model do

  context '::import_from_file' do
    let(:filepath) { Rails.root.join 'spec', 'fixtures', 'files', 'data.csv' }
    let(:existing_contact) { create :existing_contact }
    let(:collection) { ContactCollection.import_from_file filepath.to_path }

    it 'creates or updates contact records' do
      collection
      expect(Contact.count).to eq(200)
    end
    it 'tells us how many contacts were created' do
      existing_contact
      expect(collection.created).to eq(199)
    end
    it 'tells us how many contacts were updated' do
      existing_contact
      expect(collection.updated).to eq(1)
    end
  end

end
