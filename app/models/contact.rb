class Contact < ActiveRecord::Base

  validates :first_name, :last_name, presence: true
  before_save :normalize_phone_number

  private

  def normalize_phone_number
    return unless phone_number
    phone_number_parts = phone_number.downcase.split 'x'
    phone_number_parts.map! { |part| part.gsub(/\D/, '') }
    self.phone_number = phone_number_parts.join 'x'
  end

end
