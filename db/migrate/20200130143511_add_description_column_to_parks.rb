class AddDescriptionColumnToParks < ActiveRecord::Migration[5.2]
  def change
    add_column :parks, :description, :text, null: false
  end
end
