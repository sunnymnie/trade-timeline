import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import Toolbar from "../tools/Toolbar";
import Timeline from "./Timeline";
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

  useEffect(() => {
    dispatch(fetchTradesAsync());
  }, [dispatch]);

  return (
    <div className="h-screen">
      <div className="border border-x-0 border-gray-400 border-2 w-full absolute h-[3em] flex">
        <h1 className="m-auto text-2xl font-bold ">Trade Timeline</h1>
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
        <div className="w-1/4 relative flex flex-col justify-between bg-white border border-l-2 border-gray-400 border-0 mt-[3em]">
          <TradeForm selectedTrade={selectedTrade} dispatch={dispatch} />
          <Toolbar />
        </div>
      </div>
    </div>
  );
}

export default Trades;
