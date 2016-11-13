require 'rails_helper'

describe Contact, type: :model do

  context 'database' do
    context 'columns' do
      it { is_expected.to have_db_column(:first_name).of_type(:string) }
      it { is_expected.to have_db_column(:last_name).of_type(:string) }
      it { is_expected.to have_db_column(:phone_number).of_type(:string) }
      it { is_expected.to have_db_column(:email_address).of_type(:string) }
      it { is_expected.to have_db_column(:company_name).of_type(:string) }
      it { is_expected.to have_db_column(:created_at).of_type(:datetime) }
      it { is_expected.to have_db_column(:updated_at).of_type(:datetime) }
    end
    context 'indices' do
      it { is_expected.to have_db_index(:first_name) }
      it { is_expected.to have_db_index(:last_name) }
      it { is_expected.to have_db_index(:phone_number) }
      it { is_expected.to have_db_index(:email_address) }
      it { is_expected.to have_db_index(:company_name) }
      it { is_expected.to have_db_index(:created_at) }
      it { is_expected.to have_db_index(:updated_at) }
    end
  end

  context 'attributes' do
    let(:contact) { build :contact }
    it 'has first_name field' do
      expect(contact).to have_attribute(:first_name)
    end
    it 'has last_name field' do
      expect(contact).to have_attribute(:last_name)
    end
    it 'has phone_number field' do
      expect(contact).to have_attribute(:phone_number)
    end
    it 'has email_address field' do
      expect(contact).to have_attribute(:email_address)
    end
    it 'has company_name field' do
      expect(contact).to have_attribute(:company_name)
    end
    it 'has created_at field' do
      expect(contact).to have_attribute(:created_at)
    end
    it 'has updated_at field' do
      expect(contact).to have_attribute(:updated_at)
    end
  end

  context 'normalization' do
    it 'normalizes a phone number with an extension' do
      contact = create :contact, phone_number: '1-033-511-1831 x471'
      expect(contact.phone_number).to eq('10335111831x471')
    end
    it 'normalizes a phone number without an extension' do
      contact = create :contact, phone_number: '1-033-511-1831'
      expect(contact.phone_number).to eq('10335111831')
    end
  end

  context 'instance with an extended phone number' do
    let(:contact) { create :contact, phone_number: '1-033-511-1831 x471' }
    it 'provides the base phone number' do
      expect(contact.phone_number_base).to eq('10335111831')
    end
    it 'provides the phone number extension' do
      expect(contact.phone_number_extension).to eq('471')
    end
  end

  context 'instance with a simple phone number' do
    let(:contact) { create :contact, phone_number: '1-033-511-1831' }
    it 'provides the base phone number' do
      expect(contact.phone_number_base).to eq('10335111831')
    end
    it 'provides a nil phone number extension' do
      expect(contact.phone_number_extension).to eq(nil)
    end
  end

end
