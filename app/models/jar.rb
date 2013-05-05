
  #A jar is a collection of upto 12 uploaded photos, owned by an individual user

class Jar < ActiveRecord::Base

  attr_accessible :title, :user_id, :photos_attributes, :tags_attributes, :tag_ids, :tags

  belongs_to :user

  has_many :taggings, inverse_of: :tag
  has_many :tags, through: :taggings
  accepts_nested_attributes_for :taggings
  
  has_many :photos, inverse_of: :jar
  accepts_nested_attributes_for :photos

  validates :title, presence: true, uniqueness: {scope: :user_id}

  def as_json(options={})
    json = super
    json['photos'] = photos.as_json
    json['taggings'] = taggings.as_json
    json['user'] = taggings.as_json

    json
  end


end