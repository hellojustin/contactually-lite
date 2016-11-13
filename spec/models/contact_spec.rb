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
end
