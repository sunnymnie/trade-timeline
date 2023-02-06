import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import Trade from "./Trade";

import {
  fetchTradesAsync,
  selectStatus,
  selectTrades,
  Status,
} from "./tradeSlice";

export function Trades() {
  const trades = useAppSelector(selectTrades);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTradesAsync());
  }, [dispatch]);
  //   const [incrementAmount, setIncrementAmount] = useState('2');

  //   const incrementValue = Number(incrementAmount) || 0;

  let contents;

  if (status !== Status.Fetched) {
    contents = <div>{status}</div>;
  } else {
    contents = (
      <div>
        <div>{status}</div>
        {trades &&
          trades.length > 0 &&
          trades.map((trade) => {
            return (
              <div key={trade.id}>
                <Trade dispatch={dispatch} trade={trade} />
                {/* <div>{trade.title}</div>
                <div>{trade.description}</div> */}
              </div>
            );
          })}
      </div>
    );
  }
  return (
    <div>
      <h1>Trades WORKS!</h1>
      <h3>Status: {}</h3>
      <div>{contents}</div>
    </div>
  );
}

export default Trades;
