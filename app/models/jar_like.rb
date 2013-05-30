class JarLike < ActiveRecord::Base
  attr_accessible :jar_id, :user_id

  validates :jar_id, presence: true, uniqueness: {scope: user_id}
  validates :user_id, presence: true

  belongs_to :jar
  belongs_to :user
end
