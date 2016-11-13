require 'csv'

class ContactCollection
  include ActiveModel::Serializers::JSON
  attr_accessor :created
  attr_accessor :updated

  class << self

    def import_from_file(filepath)
      collection  = ContactCollection.new
      csv_options = { headers: true, header_converters: :symbol }
      CSV.foreach filepath, csv_options do |row|
        contact = Contact.find_or_initialize_by(
          first_name: row[:first_name], last_name: row[:last_name]
        )
        contact.new_record? ? collection.created += 1 : collection.updated += 1
        contact.update_attributes row.to_hash
      end
      collection
    end

  end

  def initialize
    self.created = 0
    self.updated = 0
  end

  def attributes
    { created: created, updated: updated }
  end

end
