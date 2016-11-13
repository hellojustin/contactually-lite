require 'csv'

class ContactCollection

  class << self

    def import_from_file(filepath)
      result      = { created: 0, updated: 0 }
      csv_options = { headers: true, header_converters: :symbol }
      CSV.foreach filepath, csv_options do |row|
        contact = Contact.find_or_initialize_by(
          first_name: row[:first_name], last_name: row[:last_name]
        )
        contact.new_record? ? result[:created] += 1 : result[:updated] += 1
        contact.update_attributes row.to_hash
      end
      result
    end

  end

end
