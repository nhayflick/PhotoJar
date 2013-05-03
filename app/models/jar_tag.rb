class JarTag < ActiveRecord::Base
  attr_accessible :tag, :jar_id

  belongs_to :jar

  validates :tag, :jar_id, presence: true, uniqueness: true
end
