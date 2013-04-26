class User < ActiveRecord::Base
   attr_accessible :user_name

   has_many :jars

   validates :user_name, :presence => true, :uniqueness => true
end
