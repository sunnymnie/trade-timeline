json.extract! trade, :id, :title, :description, :start, :end, :early_start, :late_end, :conviction, :created_at, :updated_at
json.url trade_url(trade, format: :json)
