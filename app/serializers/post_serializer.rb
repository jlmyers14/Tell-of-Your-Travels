class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :category, :image, :city
  has_one :user
  has_one :country
end
