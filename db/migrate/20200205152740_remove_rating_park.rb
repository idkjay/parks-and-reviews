class RemoveRatingPark < ActiveRecord::Migration[5.2]
  def up
    remove_column :parks, :rating
  end

  def down
    add_column :parks, :rating, :integer, null: false
  end
end
