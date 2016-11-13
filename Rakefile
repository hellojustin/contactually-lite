# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)
require 'rubocop/rake_task'

Rails.application.load_tasks

desc 'The default task (runs :spec and :rubocop)'
task default: [:rubocop, :spec] {}

RuboCop::RakeTask.new do |task|
  task.requires << 'rubocop-rspec'
end