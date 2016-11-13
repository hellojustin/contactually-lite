class ContactCollectionsController < ApplicationController

  respond_to :json

  def create
    collection = ContactCollection.import_from_file params[:upload]
    respond_with collection, location: nil
  end

end
