class CreateJars < ActiveRecord::Migration
  def change
    create_table :jars do |t|
      t.integer :user_id
      t.string :title

      t.timestamps
    end
  end
end
