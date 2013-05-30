class CreateJarLikes < ActiveRecord::Migration
  def change
    create_table :jar_likes do |t|
      t.integer :jar_id
      t.integer :user_id
      
      t.timestamps
    end
  end
end
