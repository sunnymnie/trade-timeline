class ChangeStartAndEndToDateTime < ActiveRecord::Migration[7.0]
  def change
    change_column :trades, :start, :datetime
    change_column :trades, :end, :datetime
    change_column :trades, :early_start, :datetime
    change_column :trades, :late_end, :datetime
  end
end
