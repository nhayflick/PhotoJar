class Photo < ActiveRecord::Base
  attr_accessible :filepicker_url, :jar_id, :div_id, :div_class

  belongs_to :jar

  def as_json(options=nil)
    super( {:only => ["filepicker_url", "jar_id", "div_id", "div_class"]} )
  end

end
