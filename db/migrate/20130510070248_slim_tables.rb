class SlimTables < ActiveRecord::Migration
  def change
    remove_column :photos, :caption
    remove_column :photos, :image_file_name
    remove_column :photos, :image_content_type
    remove_column :photos, :image_file_size
    remove_column :photos, :image_file_size
    remove_column :photos, :image_updated_at
  end
end
