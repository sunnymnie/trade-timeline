import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import Slider from "./Slider";
import Timeline from "./Timeline";
import TimeSlider from "./TimeSlider";
import Trade from "./Trade";
import TradeForm from "./TradeForm";
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
    return selectedTrade && selectedTrade.id === trade.id;
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
    <div className="h-screen">
      <div className="bg-blue-500 w-full absolute h-[3em] flex">
        <h1 className="m-auto">Header: Dashboard</h1>
      </div>
      <div className="flex h-full">
        <div className="w-3/4 mt-[3em]">
          <Timeline
            dispatch={dispatch}
            trades={trades}
            setSelectedTrade={setSelectedTrade}
            isSelectedTrade={isSelectedTrade}
          />
        </div>
        <div className="w-1/4 bg-purple-200 mt-[3em]">
          Trade info column
          <div>
            {/* {selectedTrade ? JSON.stringify(selectedTrade) : <TradeForm />} */}
            <TradeForm selectedTrade={selectedTrade} dispatch={dispatch} />
          </div>
          {/* <TradeForm /> */}
        </div>
      </div>
    </div>
  );
}

export default Trades;
