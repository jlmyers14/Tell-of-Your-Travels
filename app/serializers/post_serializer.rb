class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :category, :city
  has_one :user
  has_one :country
end
