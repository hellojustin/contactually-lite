class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone_number
      t.string :email_address
      t.string :company_name
      t.timestamps
    end

    add_index :contacts, :first_name
    add_index :contacts, :last_name
    add_index :contacts, :phone_number
    add_index :contacts, :email_address
    add_index :contacts, :company_name
    add_index :contacts, :created_at
    add_index :contacts, :updated_at
  end
end
