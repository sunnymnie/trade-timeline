import React, { useState, useEffect, useRef } from "react";
import Month from "./Month";
import TimeSlider from "./TimeSlider";
import Trade from "./Trade";

export function Timeline(props: any) {
  let date: Date = new Date();

  const [daysFromNow, setDaysFromNow] = useState<number>(30);

  const endDate = new Date(
    new Date().setDate(new Date().getDate() + daysFromNow)
  );
  const startDate = new Date(new Date().setDate(new Date().getDate() - 10));

  const daysDifferenceBetweenDates = (later: Date, earlier: Date) => {
    return Math.ceil(
      (later.valueOf() - earlier.valueOf()) / (1000 * 60 * 60 * 24)
    );
  };

  const length = daysDifferenceBetweenDates(endDate, startDate);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }

  const width = (useWindowDimensions().width * 3) / 4;

  const getStart = (start: Date) => {
    if (start < startDate) return 0;
    if (start > endDate) return width * 0.9;
    return (daysDifferenceBetweenDates(start, startDate) / length) * width;
  };

  const getEnd = (end: Date) => {
    if (end < startDate) return width * 0.9;
    if (end > endDate) return 0;
    return (daysDifferenceBetweenDates(endDate, end) / length) * width;
  };

  const getNumberOfDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function getEndOfMonth(date: Date) {
    return addDays(date, getNumberOfDaysInMonth(date) - date.getDate());
  }

  function getStartOfNextMonth(date: Date) {
    return addDays(getEndOfMonth(date), 1);
  }

  function getStartOfMonth(date: Date) {
    return addDays(date, -date.getDate() + 1);
  }

  //TODO Start here
  const rows = [];
  let i = 0;
  let remainingDays = getNumberOfDaysInMonth(startDate) - startDate.getDate();
  if (remainingDays > 0) {
    rows.push(
      <Month
        date={startDate}
        start={getStart(startDate)}
        end={getEnd(getEndOfMonth(startDate))}
        top={0}
      />
    );
  }
  i += remainingDays + 1;
  while (i < length) {
    // let date = new Date(startDate.getDate() + i);
    let date = addDays(startDate, i);
    let days = getNumberOfDaysInMonth(date);
    rows.push(
      <Month
        date={date}
        start={getStart(date)}
        end={getEnd(getEndOfMonth(date))}
        top={1}
      />
    );
    i += days;
  }

  return (
    <div className="h-[100%]">
      <TimeSlider setDaysFromNow={setDaysFromNow} daysFromNow={daysFromNow} />
      <div className="">
        <div className="">
          {props.trades &&
            props.trades.length > 0 &&
            props.trades.map((trade: any) => {
              return (
                <div key={trade.id}>
                  <Trade
                    dispatch={props.dispatch}
                    trade={trade}
                    setSelectedTrade={props.setSelectedTrade}
                    isSelectedTrade={props.isSelectedTrade}
                    start={getStart(trade.start)}
                    end={getEnd(trade.end)}
                  />
                </div>
              );
            })}
        </div>
        <div className="">{rows.map((row: any) => row)}</div>
      </div>
    </div>
  );
}

export default Timeline;
