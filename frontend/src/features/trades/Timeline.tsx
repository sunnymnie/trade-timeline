import React, { useState, useEffect, useRef } from "react";
import Month from "./Month";
import TimeSlider from "./TimeSlider";
import Trade from "./Trade";

export function Timeline(props: any) {
  //   const count = useAppSelector(selectCount);
  //   const dispatch = useAppDispatch();
  //   const [incrementAmount, setIncrementAmount] = useState('2');

  //   const incrementValue = Number(incrementAmount) || 0;

  //   const [isSelected, setIsSelected] = useState(false);

  //   const [title, setTitle] = useState(props.trade.title);
  //   const [description, setDescription] = useState(props.trade.description);

  //   const clickOnTrade = () => {
  //     props.isSelectedTrade(props.trade)
  //       ? props.setSelectedTrade(undefined)
  //       : props.setSelectedTrade(props.trade);
  //   };

  let date: Date = new Date();

  const [daysFromNow, setDaysFromNow] = useState<number>(30);

  const endDate = new Date(
    new Date().setDate(new Date().getDate() + daysFromNow)
  );
  const startDate = new Date(new Date().setDate(new Date().getDate() - 10));

  // useEffect(() => {
  //   const endDate = new Date(
  //     new Date().setDate(new Date().getDate() + daysFromNow)
  //   );
  //   const startDate = new Date(new Date().setDate(new Date().getDate() - 10));
  // }, [daysFromNow]);

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

  const screenWidth = (width: number) => {
    return `w-[${width}px]`;
  };

  // const screenClassName = (width: number) => {
  //   return `absolute ${screenWidth(width)} h-100 bg-red-500`;
  // };

  // const num = () => {
  //   return "1/4";
  // };
  const testStart = (length: number) => {
    const obj: any = [0, 0.5, 0.34, 0.04, 0.25];
    return obj[length];
  };

  const testEnd = (length: number) => {
    const obj: any = [0.5, 1, 0.56, 0.23, 0.88];
    return obj[length];
  };

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

  const debugginginfo = [];

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
    debugginginfo.push({
      date: startDate.toISOString(),
      start: getStart(startDate),
      end: getEnd(getEndOfMonth(startDate)),
      endDate: getEndOfMonth(startDate).toISOString(),
      days: remainingDays,
    });
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
    debugginginfo.push({
      date: date.toISOString(),
      start: getStart(date),
      end: getEnd(getEndOfMonth(date)),
      endDate: getEndOfMonth(date).toISOString(),
      days: days,
    });
    i += days;
  }
  // for (let i = 0; i < numrows; i++) {
  //   // note: we are adding a key prop here to allow react to uniquely identify each
  //   // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
  //   rows.push(<ObjectRow key={i} />);
  // }
  // return <tbody>{rows}</tbody>;

  return (
    // <div className="w-[500px]">
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

    // <Trade
    //   trade={props.trades[0]}
    //   setSelectedTrade={props.setSelectedTrade}
    //   isSelectedTrade={props.isSelectedTrade}
    //   dispatch={props.dispatch}
    //   width={200}
    // />
    // </div>
  );

  //   if (props.trades.length < 1) {
  //     return (
  //       <div>
  //         {/* <div>{JSON.stringify(useWindowDimensions())}</div>;<div></div>
  //         <div className={`absolute w-{${num()}} h-100 bg-red-500`}>hi</div>
  //         <div className={`absolute w-[1/4] h-100 bg-red-500`}>bye</div> */}
  //         <div>{JSON.stringify(props.trade[0])}</div>
  //         <div>trade below here</div>
  // {/* <Trade
  //   trade={props.trades[0]}
  //   setSelectedTrade={props.setSelectedTrade}
  //   isSelectedTrade={props.isSelectedTrade}
  //   dispatch={props.dispatch}
  //   width={200}
  // /> */}
  //         <div>trade above here</div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         False {JSON.stringify(props)}, {props.trades.length < 1 ? "no" : "yes"}
  //       </div>
  //     );
  //   }

  //   return (
  //     props.trades.length ? (<div>
  //         <div>{JSON.stringify(useWindowDimensions())}</div>;<div></div>
  //         <div className={`absolute w-{${num()}} h-100 bg-red-500`}>hi</div>
  //         <div className={`absolute w-[1/4] h-100 bg-red-500`}>bye</div>
  //         <div>{JSON.stringify(props.trade[0])}</div>
  //         <div>trade below here</div>
  //         <Trade
  //           trade={props.trades[0]}
  //           setSelectedTrade={props.setSelectedTrade}
  //           isSelectedTrade={props.isSelectedTrade}
  //           dispatch={props.dispatch}
  //           width={200}
  //         />
  //         <div>trade above here</div>
  //       </div>) : (<div>hi</div>)}
  //     )
}

export default Timeline;
