import { tradeState } from "./tradeSlice";

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
