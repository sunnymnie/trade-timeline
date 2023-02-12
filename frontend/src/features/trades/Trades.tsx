import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import Slider from "./Slider";
import Timeline from "./Timeline";
import Trade from "./Trade";
import { tradeState } from "./tradeSlice";

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
  const [selectedTrade, setSelectedTrade] = useState<tradeState | undefined>(
    undefined
  );
  const isSelectedTrade = (trade: tradeState) => {
    return selectedTrade && selectedTrade.id == trade.id;
  };

  const refContainer: any = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (refContainer.current) {
      setDimensions({
        width: refContainer.current.clientWidth,
        height: refContainer.current.offsetHeight,
      });
    }
  }, []);
  useEffect(() => {
    dispatch(fetchTradesAsync());
  }, [dispatch]);
  //   const [incrementAmount, setIncrementAmount] = useState('2');

  //   const incrementValue = Number(incrementAmount) || 0;

  let contents;

  if (status !== Status.Fetched) {
    contents = <div>{status}</div>;
  } else {
    // contents = (
    //   <div>
    //     <div>{status}</div>
    //     {trades &&
    //       trades.length > 0 &&
    //       trades.map((trade) => {
    //         return (
    //           <div key={trade.id}>
    //             <Trade
    //               dispatch={dispatch}
    //               trade={trade}
    //               setSelectedTrade={setSelectedTrade}
    //               isSelectedTrade={isSelectedTrade}
    //             />
    //             {/* <div>{trade.title}</div>
    //             <div>{trade.description}</div> */}
    //           </div>
    //         );
    //       })}
    //   </div>
    // );
  }
  return (
    <div>
      <h1>Trades WORKS!</h1>
      <div>{JSON.stringify(dimensions)}</div>
      {/* <h3>Status: {}</h3>
      <div>{contents}</div>
      <div>Selected trade:</div>
      <div>
        {selectedTrade && <div>{JSON.stringify(selectedTrade.title)}</div>}
      </div> */}
      <Timeline
        dispatch={dispatch}
        trades={trades}
        setSelectedTrade={setSelectedTrade}
        isSelectedTrade={isSelectedTrade}
      />
      {/* <Slider /> */}
    </div>
  );
}

export default Trades;
