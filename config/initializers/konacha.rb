# Configure Konacha to use a headless environment when running tests.
Konacha.configure do |config|
  require 'capybara/poltergeist'
  config.driver = :poltergeist
end if defined?(Konacha)
