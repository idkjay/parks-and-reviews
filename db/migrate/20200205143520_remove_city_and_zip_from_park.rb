class RemoveCityAndZipFromPark < ActiveRecord::Migration[5.2]
  def up
    remove_column :parks, :city
    remove_column :parks, :zip
  end

  def down
    add_column :parks, :city, :string, null: false
    add_column :parks, :zip, :string, null: false
  end
end
