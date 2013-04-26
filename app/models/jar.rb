
  #A jar is a collection of upto 12 uploaded photos, owned by an individual user

class Jar < ActiveRecord::Base

  attr_accessible :title, :user_id

  belongs_to :user

  validates :title, presence: true, uniqueness: {scope: :user_id}

end
