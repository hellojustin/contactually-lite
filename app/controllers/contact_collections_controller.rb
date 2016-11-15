class ContactCollectionsController < ApplicationController

  respond_to :json

  def create
    tempfile = params[:upload].tempfile
    collection = ContactCollection.import_from_file tempfile
    respond_with collection, location: nil
  end

  def destroy
    Contact.delete_all id: params[:id].split(',')
    respond_with nil
  end

end
