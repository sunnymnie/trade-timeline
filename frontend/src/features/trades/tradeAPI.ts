import { TradeDeleteData, TradeFormData, tradeState } from "./tradeSlice";

const API_URL = "http://localhost:3000";

export async function fetchTrades() {
  return fetch(`${API_URL}/trades.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("ERROR: ", error);
      return {} as tradeState;
    });
}

export async function createTrade(payload: TradeFormData) {
  const trade = payload.trade;
  return fetch(`${API_URL}/trades.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trade),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("ERROR: ", error);
      return {} as tradeState;
    });
}

export async function updateTrade(payload: TradeFormData) {
  const trade = payload.trade;
  return fetch(`${API_URL}/trades/${trade.id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trade),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("ERROR: ", error);
      return {} as tradeState;
    });
}

export async function destroyTrade(payload: TradeDeleteData) {
  const trade = payload.trade;
  return fetch(`${API_URL}/trades/${trade.trade_id}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trade),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("ERROR: ", error);
      return {} as tradeState;
    });
}
