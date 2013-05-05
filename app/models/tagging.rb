class Tagging < ActiveRecord::Base
  attr_accessible :jar_id, :tag_id

  belongs_to :jar, inverse_of: :taggings
  belongs_to :tag, inverse_of: :taggings

  # validates :jar, :tag_id, presence: true
  # need to fix this^^
  # validates :jar_id, uniqueness: {scope: :tag_id}
end
