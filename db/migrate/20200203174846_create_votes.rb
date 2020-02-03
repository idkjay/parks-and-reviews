class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.belongs_to :review, null: false
      t.belongs_to :user, null: false

      t.integer :votes, default: 0

      t.timestamps null: false
    end
  end
end
