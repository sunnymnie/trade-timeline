class CreateTrades < ActiveRecord::Migration[7.0]
  def change
    create_table :trades do |t|
      t.string :title
      t.text :description
      t.time :start
      t.time :end
      t.time :early_start
      t.time :late_end
      t.integer :conviction

      t.timestamps
    end
  end
end
