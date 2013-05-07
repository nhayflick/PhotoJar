class Photo < ActiveRecord::Base
  attr_accessible :caption, :filepicker_url, :jar_id, :div_id, :div_class, :created_at, :image_content_type, :image_file_name, :image_file_size, :image_updated_at, :updated_at


  belongs_to :jar

end
