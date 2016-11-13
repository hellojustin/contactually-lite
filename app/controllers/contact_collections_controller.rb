class ContactCollectionsController < ApplicationController

  respond_to :json

  def create
    lines = ''
    uploaded_file_name = params[:upload].original_filename
    uploaded_file_path = Rails.root.join 'public', 'uploads', uploaded_file_name
    File.delete uploaded_file_path
    respond_with lines
  end

end
