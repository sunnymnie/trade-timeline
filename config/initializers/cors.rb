Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        origins '*' #or http://localhost:3001
        resource '*', headers: :any, methods: %i[get post patch put delete]
    end
end