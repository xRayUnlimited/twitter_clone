require_relative 'boot'

require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
Bundler.require(*Rails.groups)

module TwitterFeed
  class Application < Rails::Application
    config.load_defaults 5.1
    config.api_only = true
    config.autoload_paths << Rails.root.join('lib')
  end
end
