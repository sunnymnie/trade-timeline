require "application_system_test_case"

class TradesTest < ApplicationSystemTestCase
  setup do
    @trade = trades(:one)
  end

  test "visiting the index" do
    visit trades_url
    assert_selector "h1", text: "Trades"
  end

  test "should create trade" do
    visit trades_url
    click_on "New trade"

    fill_in "Conviction", with: @trade.conviction
    fill_in "Description", with: @trade.description
    fill_in "Early start", with: @trade.early_start
    fill_in "End", with: @trade.end
    fill_in "Late end", with: @trade.late_end
    fill_in "Start", with: @trade.start
    fill_in "Title", with: @trade.title
    click_on "Create Trade"

    assert_text "Trade was successfully created"
    click_on "Back"
  end

  test "should update Trade" do
    visit trade_url(@trade)
    click_on "Edit this trade", match: :first

    fill_in "Conviction", with: @trade.conviction
    fill_in "Description", with: @trade.description
    fill_in "Early start", with: @trade.early_start
    fill_in "End", with: @trade.end
    fill_in "Late end", with: @trade.late_end
    fill_in "Start", with: @trade.start
    fill_in "Title", with: @trade.title
    click_on "Update Trade"

    assert_text "Trade was successfully updated"
    click_on "Back"
  end

  test "should destroy Trade" do
    visit trade_url(@trade)
    click_on "Destroy this trade", match: :first

    assert_text "Trade was successfully destroyed"
  end
end
