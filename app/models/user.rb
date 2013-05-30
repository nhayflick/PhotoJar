class User < ActiveRecord::Base
  attr_accessible :user_name, :email, :password, :password_confirmation, :avatar_url
  has_secure_password

  has_many :jars, :jar_likes

  before_save { |user| user.email = email.downcase }
  before_save :create_remember_token
  #HARTL validation code
  validates :user_name,  presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6 }
  validates :password_confirmation, presence: true

  def as_json(options={})
      super(:include => :jars)
  end


  private

    def create_remember_token
      self.remember_token = SecureRandom.urlsafe_base64
    end

end
