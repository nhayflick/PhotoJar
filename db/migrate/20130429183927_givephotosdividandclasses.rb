class Givephotosdividandclasses < ActiveRecord::Migration
  def change
    add_column :photos, :div_id, :integer
    add_column :photos, :div_class, :string
  end
end
