import React, { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useAppSelector, useAppDispatch } from "../../app/hooks";
// import { AppDispatch } from "../../app/store";
import { Trades } from "../trades/Trades";

export function Dashboard() {
  //   const trades = useAppSelector(selectTrades);
  //   const status = useAppSelector(selectStatus);
  //   const dispatch = useDispatch<AppDispatch>();

  const [selectedTrade, setSelectedTrade] = useState(undefined);

  //   useEffect(() => {
  //     dispatch(fetchTradesAsync());
  //   }, [dispatch]);

  return (
    <div className="h-screen bg-red-500">
      <div className="bg-blue-500 py-3">
        <h1>Header: Dashboard</h1>
      </div>
      <div className="flex h-full bg-gray-200">
        <div className="w-3/4 bg-green-200">
          <Trades />
        </div>
        <div className="w-1/4 bg-purple-200">Trade info column</div>
      </div>
    </div>
  );
}

export default Dashboard;
