# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150311201046) do

  create_table "active_admin_comments", force: :cascade do |t|
    t.string   "namespace",     limit: 255
    t.text     "body",          limit: 65535
    t.string   "resource_id",   limit: 50,    null: false
    t.string   "resource_type", limit: 50,    null: false
    t.integer  "author_id",     limit: 4
    t.string   "author_type",   limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id", using: :btree
  add_index "active_admin_comments", ["namespace"], name: "index_active_admin_comments_on_namespace", using: :btree
  add_index "active_admin_comments", ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id", using: :btree

  create_table "admin_users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "admin_users", ["email"], name: "index_admin_users_on_email", unique: true, using: :btree
  add_index "admin_users", ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true, using: :btree

  create_table "api_keys", force: :cascade do |t|
    t.string   "api_key",    limit: 16
    t.integer  "channel_id", limit: 4
    t.integer  "user_id",    limit: 4
    t.boolean  "write_flag",             default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "note",       limit: 255
  end

  add_index "api_keys", ["api_key"], name: "index_api_keys_on_api_key", unique: true, using: :btree
  add_index "api_keys", ["channel_id"], name: "index_api_keys_on_channel_id", using: :btree

  create_table "channels", force: :cascade do |t|
    t.integer  "user_id",                   limit: 4
    t.string   "name",                      limit: 255
    t.string   "description",               limit: 255
    t.decimal  "latitude",                                precision: 15, scale: 10
    t.decimal  "longitude",                               precision: 15, scale: 10
    t.string   "field1",                    limit: 255
    t.string   "field2",                    limit: 255
    t.string   "field3",                    limit: 255
    t.string   "field4",                    limit: 255
    t.string   "field5",                    limit: 255
    t.string   "field6",                    limit: 255
    t.string   "field7",                    limit: 255
    t.string   "field8",                    limit: 255
    t.integer  "scale1",                    limit: 4
    t.integer  "scale2",                    limit: 4
    t.integer  "scale3",                    limit: 4
    t.integer  "scale4",                    limit: 4
    t.integer  "scale5",                    limit: 4
    t.integer  "scale6",                    limit: 4
    t.integer  "scale7",                    limit: 4
    t.integer  "scale8",                    limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "elevation",                 limit: 255
    t.integer  "last_entry_id",             limit: 4
    t.boolean  "public_flag",                                                       default: false
    t.string   "options1",                  limit: 255
    t.string   "options2",                  limit: 255
    t.string   "options3",                  limit: 255
    t.string   "options4",                  limit: 255
    t.string   "options5",                  limit: 255
    t.string   "options6",                  limit: 255
    t.string   "options7",                  limit: 255
    t.string   "options8",                  limit: 255
    t.boolean  "social",                                                            default: false
    t.string   "slug",                      limit: 255
    t.string   "status",                    limit: 255
    t.string   "url",                       limit: 255
    t.string   "video_id",                  limit: 255
    t.string   "video_type",                limit: 255
    t.boolean  "clearing",                                                          default: false, null: false
    t.integer  "ranking",                   limit: 4
    t.string   "user_agent",                limit: 255
    t.string   "realtime_io_serial_number", limit: 36
    t.text     "metadata",                  limit: 65535
    t.datetime "last_write_at"
  end

  add_index "channels", ["latitude", "longitude"], name: "index_channels_on_latitude_and_longitude", using: :btree
  add_index "channels", ["public_flag", "last_entry_id", "updated_at"], name: "channels_public_viewable", using: :btree
  add_index "channels", ["ranking", "updated_at"], name: "index_channels_on_ranking_and_updated_at", using: :btree
  add_index "channels", ["realtime_io_serial_number"], name: "index_channels_on_realtime_io_serial_number", using: :btree
  add_index "channels", ["slug"], name: "index_channels_on_slug", using: :btree
  add_index "channels", ["user_id"], name: "index_channels_on_user_id", using: :btree

  create_table "commands", force: :cascade do |t|
    t.string   "command_string", limit: 255
    t.integer  "position",       limit: 4
    t.integer  "talkback_id",    limit: 4
    t.datetime "executed_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "commands", ["talkback_id", "executed_at"], name: "index_commands_on_talkback_id_and_executed_at", using: :btree

  create_table "comments", force: :cascade do |t|
    t.integer  "parent_id",  limit: 4
    t.text     "body",       limit: 65535
    t.integer  "flags",      limit: 4
    t.integer  "user_id",    limit: 4
    t.string   "ip_address", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "channel_id", limit: 4
  end

  add_index "comments", ["channel_id"], name: "index_comments_on_channel_id", using: :btree

  create_table "daily_feeds", force: :cascade do |t|
    t.integer "channel_id",  limit: 4
    t.date    "date"
    t.string  "calculation", limit: 20
    t.string  "result",      limit: 255
    t.integer "field",       limit: 1
  end

  add_index "daily_feeds", ["channel_id", "date"], name: "index_daily_feeds_on_channel_id_and_date", using: :btree

  create_table "devices", force: :cascade do |t|
    t.integer  "user_id",          limit: 4
    t.string   "title",            limit: 255
    t.string   "model",            limit: 255
    t.string   "ip_address",       limit: 255
    t.integer  "port",             limit: 4
    t.string   "mac_address",      limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "local_ip_address", limit: 255
    t.integer  "local_port",       limit: 4
    t.string   "default_gateway",  limit: 255
    t.string   "subnet_mask",      limit: 255
  end

  add_index "devices", ["mac_address"], name: "index_devices_on_mac_address", using: :btree
  add_index "devices", ["user_id"], name: "index_devices_on_user_id", using: :btree

  create_table "failedlogins", force: :cascade do |t|
    t.string   "login",      limit: 255
    t.string   "password",   limit: 255
    t.string   "ip_address", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "feeds", force: :cascade do |t|
    t.integer  "channel_id", limit: 4
    t.string   "field1",     limit: 255
    t.string   "field2",     limit: 255
    t.string   "field3",     limit: 255
    t.string   "field4",     limit: 255
    t.string   "field5",     limit: 255
    t.string   "field6",     limit: 255
    t.string   "field7",     limit: 255
    t.string   "field8",     limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "entry_id",   limit: 4
    t.string   "status",     limit: 255
    t.decimal  "latitude",               precision: 15, scale: 10
    t.decimal  "longitude",              precision: 15, scale: 10
    t.string   "elevation",  limit: 255
    t.string   "location",   limit: 255
  end

  add_index "feeds", ["channel_id", "created_at"], name: "index_feeds_on_channel_id_and_created_at", using: :btree
  add_index "feeds", ["channel_id", "entry_id"], name: "index_feeds_on_channel_id_and_entry_id", using: :btree

  create_table "headers", force: :cascade do |t|
    t.string   "name",         limit: 255
    t.string   "value",        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "thinghttp_id", limit: 4
  end

  add_index "headers", ["thinghttp_id"], name: "index_headers_on_thinghttp_id", using: :btree

  create_table "pipes", force: :cascade do |t|
    t.string   "name",       limit: 255, null: false
    t.string   "url",        limit: 255, null: false
    t.string   "slug",       limit: 255, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "parse",      limit: 255
    t.integer  "cache",      limit: 4
  end

  add_index "pipes", ["slug"], name: "index_pipes_on_slug", using: :btree

  create_table "plugins", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.integer  "user_id",     limit: 4
    t.text     "html",        limit: 65535
    t.text     "css",         limit: 65535
    t.text     "js",          limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "public_flag",               default: false
  end

  add_index "plugins", ["user_id"], name: "index_plugins_on_user_id", using: :btree

  create_table "reacts", force: :cascade do |t|
    t.integer  "user_id",               limit: 4
    t.string   "name",                  limit: 255
    t.string   "react_type",            limit: 10
    t.integer  "run_interval",          limit: 4
    t.boolean  "run_on_insertion",                  default: true,        null: false
    t.datetime "last_run_at"
    t.integer  "channel_id",            limit: 4
    t.integer  "field_number",          limit: 4
    t.string   "condition",             limit: 15
    t.string   "condition_value",       limit: 255
    t.float    "condition_lat",         limit: 24
    t.float    "condition_long",        limit: 24
    t.float    "condition_elev",        limit: 24
    t.integer  "actionable_id",         limit: 4
    t.boolean  "last_result",                       default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "actionable_type",       limit: 255, default: "Thinghttp"
    t.string   "action_value",          limit: 255
    t.string   "latest_value",          limit: 255
    t.boolean  "activated",                         default: true
    t.boolean  "run_action_every_time",             default: false
  end

  add_index "reacts", ["channel_id", "run_on_insertion"], name: "index_reacts_on_channel_id_and_run_on_insertion", using: :btree
  add_index "reacts", ["channel_id"], name: "index_reacts_on_channel_id", using: :btree
  add_index "reacts", ["run_interval"], name: "index_reacts_on_run_interval", using: :btree
  add_index "reacts", ["user_id"], name: "index_reacts_on_user_id", using: :btree

  create_table "scheduled_thinghttps", force: :cascade do |t|
    t.integer  "user_id",      limit: 4
    t.string   "name",         limit: 255
    t.boolean  "activated",                default: true, null: false
    t.integer  "run_interval", limit: 4
    t.integer  "thinghttp_id", limit: 4
    t.integer  "channel_id",   limit: 4
    t.string   "field_name",   limit: 255
    t.datetime "last_run_at"
    t.string   "last_result",  limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "scheduled_thinghttps", ["activated", "run_interval"], name: "index_scheduled_thinghttps_on_activated_and_run_interval", using: :btree
  add_index "scheduled_thinghttps", ["user_id"], name: "index_scheduled_thinghttps_on_user_id", using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id",     limit: 4
    t.integer  "channel_id", limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "taggings", ["channel_id"], name: "index_taggings_on_channel_id", using: :btree
  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tags", ["name"], name: "index_tags_on_name", using: :btree

  create_table "talkbacks", force: :cascade do |t|
    t.string   "api_key",    limit: 16
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id",    limit: 4
    t.string   "name",       limit: 255
    t.integer  "channel_id", limit: 4
  end

  add_index "talkbacks", ["api_key"], name: "index_talkbacks_on_api_key", using: :btree
  add_index "talkbacks", ["user_id"], name: "index_talkbacks_on_user_id", using: :btree

  create_table "thinghttps", force: :cascade do |t|
    t.integer  "user_id",      limit: 4
    t.string   "api_key",      limit: 16
    t.text     "url",          limit: 65535
    t.string   "auth_name",    limit: 255
    t.string   "auth_pass",    limit: 255
    t.string   "method",       limit: 255
    t.string   "content_type", limit: 255
    t.string   "http_version", limit: 255
    t.string   "host",         limit: 255
    t.text     "body",         limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name",         limit: 255
    t.string   "parse",        limit: 255
  end

  add_index "thinghttps", ["api_key"], name: "index_thinghttps_on_api_key", using: :btree
  add_index "thinghttps", ["user_id"], name: "index_thinghttps_on_user_id", using: :btree

  create_table "tweetcontrols", force: :cascade do |t|
    t.string   "screen_name",    limit: 255
    t.string   "trigger",        limit: 255
    t.string   "control_type",   limit: 255
    t.integer  "control_key",    limit: 4
    t.string   "control_string", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id",        limit: 4
  end

  add_index "tweetcontrols", ["screen_name"], name: "index_tweetcontrols_on_screen_name", using: :btree
  add_index "tweetcontrols", ["user_id"], name: "index_tweetcontrols_on_user_id", using: :btree

  create_table "twitter_accounts", force: :cascade do |t|
    t.string   "screen_name", limit: 255
    t.integer  "user_id",     limit: 4
    t.integer  "twitter_id",  limit: 8
    t.string   "token",       limit: 255
    t.string   "secret",      limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "api_key",     limit: 17,  null: false
  end

  add_index "twitter_accounts", ["api_key"], name: "index_twitters_on_api_key", using: :btree
  add_index "twitter_accounts", ["twitter_id"], name: "index_twitters_on_twitter_id", using: :btree
  add_index "twitter_accounts", ["user_id"], name: "index_twitters_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "login",                  limit: 255,                   null: false
    t.string   "email",                  limit: 255,                   null: false
    t.string   "encrypted_password",     limit: 255,                   null: false
    t.string   "password_salt",          limit: 255
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "time_zone",              limit: 255
    t.boolean  "public_flag",                          default: false
    t.text     "bio",                    limit: 65535
    t.string   "website",                limit: 255
    t.string   "api_key",                limit: 16
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,     default: 0,     null: false
    t.string   "authentication_token",   limit: 255
  end

  add_index "users", ["api_key"], name: "index_users_on_api_key", using: :btree
  add_index "users", ["authentication_token"], name: "index_users_on_authentication_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["login"], name: "index_users_on_login", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "watchings", force: :cascade do |t|
    t.integer  "user_id",    limit: 4
    t.integer  "channel_id", limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "watchings", ["user_id", "channel_id"], name: "index_watchings_on_user_id_and_channel_id", using: :btree

  create_table "windows", force: :cascade do |t|
    t.integer  "channel_id",   limit: 4
    t.integer  "position",     limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "html",         limit: 65535
    t.integer  "col",          limit: 4
    t.string   "title",        limit: 255
    t.string   "window_type",  limit: 255
    t.string   "name",         limit: 255
    t.boolean  "private_flag",               default: false
    t.boolean  "show_flag",                  default: true
    t.integer  "content_id",   limit: 4
    t.text     "options",      limit: 65535
  end

  add_index "windows", ["channel_id"], name: "index_windows_on_channel_id", using: :btree
  add_index "windows", ["window_type", "content_id"], name: "index_windows_on_window_type_and_content_id", using: :btree

end
