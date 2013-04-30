class AddNameOfAttrForFilepickerUrlToUser < ActiveRecord::Migration
  def change
    add_column :photos, :filepicker_url, :string
    add_column :photos, :jar_id, :integer
  end
end
