class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.text :state

      t.timestamps null: false
    end
  end
end
