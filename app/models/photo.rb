class Photo < ActiveRecord::Base
  attr_accessible :caption, :filepicker_url, :jar_id, :div_id, :div_class


  belongs_to :jar

end
