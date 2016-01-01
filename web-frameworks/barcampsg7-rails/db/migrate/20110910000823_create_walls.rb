class CreateWalls < ActiveRecord::Migration
  def self.up
    create_table :walls do |t|
      t.string :comment
      t.string :commenter

      t.timestamps
    end
  end

  def self.down
    drop_table :walls
  end
end
