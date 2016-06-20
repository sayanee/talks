# thingspeak

> This is the code base for RDRC 2016 talk

## Install

1. git clone thingspeak with

  ```bash
  git clone git@github.com:iobridge/thingspeak.git
  cd thingspeak
  ```
- `Gemfile` was slightly amended to lock the versions of `rails` and `mysql2`

  ```rb
  gem 'rails', '4.2.5'
  ...
  gem 'mysql2', '~> 0.3.18'
  ```
- run `bundle install`
- comment out `L124` in file else it will give an error `config/initializers/active_admin.rb`:

  ```rb
  config.show_comments_in_menu = false
  ```
- configure the database
  1. install mysql with `brew install mysql`
  - setup `config/database.yml`

    ```yml
    development:
      adapter: mysql2
      encoding: utf8
      reconnect: false
      database: thingspeak_development
      pool: 5
      socket: /tmp/mysql.sock
    ```
  - start the db server with `mysql.server restart`
- start the rails server with `rails s --binding=0.0.0.0`
- sign up through the GUI

  ![](readme-img/signup.png)
- login to the channel view list

  ![](readme-img/login.png)
- You can also use [Sequel Pro](http://www.sequelpro.com/download) to view the database

  ![](readme-img/sequelpro_connect.png)
  ![](readme-img/sequelpro_tables.png)

### Install MQTT

1. Install Mosquitto, MQTT broker with `brew install mosquitto`
- ensure `/usr/local/sbin`
- try out `mosquitto -v` in the command line
- code for the client subscription `mqtt.rb`

  ```rb
  require 'rubygems'
  require 'mqtt'

  # # Publish example
  # MQTT::Client.connect('localhost', 1883) do |c|
  #   c.publish('test', 'message')
  # end

  # Subscribe example
  MQTT::Client.connect('localhost', 1883) do |c|
    c.get('topic') do |topic,message|
      puts "#{topic}: #{message}"
    end
  end
  ```
- start the mqtt subscription `ruby mqtt.rb`
- publish in the command line:

  ```shell
  mosquitto_pub -h localhost -i 42 -t topic -m 'This is a test message'
  ```
- view the subscription topic and message:

  ```
  topic: This is a test message
  ```
