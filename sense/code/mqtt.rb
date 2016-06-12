require 'rubygems'
require 'mqtt'

# # Publish example
# MQTT::Client.connect('localhost', 1883) do |c|
#   c.publish('test', 'message')
# end

# Subscribe example
MQTT::Client.connect('localhost', 1883) do |c|
  # If you pass a block to the get method, then it will loop
  c.get('topic') do |topic,message|
    puts "#{topic}: #{message}"
  end
end
