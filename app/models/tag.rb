class Tag < ActiveRecord::Base
  attr_accessible :name

  has_many :taggings, inverse_of: :tag
  has_many :jars, through: :taggings

  validates :name, presence: true
end
