FactoryGirl.define do
  factory :contact do
    first_name    Faker::Name.first_name
    last_name     Faker::Name.last_name
    phone_number  Faker::PhoneNumber.phone_number
    email_address Faker::Internet.email
    company_name  Faker::Company.name
  end

  factory :existing_contact, class: Contact do
    first_name    'Gerhard'
    last_name     'Kautzer'
    email_address 'gerhardkautzer@cronabayer.com'
    phone_number  '1-207-643-1816'
    company_name  'Hodkiewicz-Lynch'
  end
end
