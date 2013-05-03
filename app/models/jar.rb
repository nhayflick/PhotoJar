
  #A jar is a collection of upto 12 uploaded photos, owned by an individual user

class Jar < ActiveRecord::Base

  attr_accessible :title, :user_id, :photos_attributes

  belongs_to :user
  has_many :photos, inverse_of: :jar
  has_many :jar_tags
  accepts_nested_attributes_for :photos

  validates :title, presence: true, uniqueness: {scope: :user_id}

  def as_json(options={})
    super(:include => :user)
  end


end