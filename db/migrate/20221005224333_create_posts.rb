class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :country, null: false, foreign_key: true
      t.text :content
      t.string :category, null: false
      t.string :city
      
      t.timestamps
    end
  end
end
