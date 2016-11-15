class ContactsController < ApplicationController
  respond_to :json

  def index
    respond_with Contact.all
  end

  def destroy
    contact = Contact.find params[:id]
    contact.delete
    respond_with contact
  end

end
