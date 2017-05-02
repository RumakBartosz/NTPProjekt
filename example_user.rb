class User
  attr_accessor :name, :last, :email

  def initialize(attributes = {})
    @name  = attributes[:name]
    @last  = attributes[:last]
    @email = attributes[:email]
  end

  def formatted_email
    "#{@name} #{@last} <#{@email}>"
  end
end
