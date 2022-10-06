class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password, :profile_image
end
