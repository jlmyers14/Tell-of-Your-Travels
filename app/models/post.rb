class Post < ApplicationRecord
    belongs_to :user
    belongs_to :country
    has_many :likes
    has_many :comments
end
