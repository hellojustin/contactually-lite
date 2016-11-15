class ContactCollectionsController < ApplicationController

  respond_to :json

  def create
    tempfile = params[:upload].tempfile
    collection = ContactCollection.import_from_file tempfile
    respond_with collection, location: nil
  end

end
