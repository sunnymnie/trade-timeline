import React, { useState, useEffect, useRef } from "react";
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

  const [daysFromNow, setDaysFromNow] = useState(30);

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

  const screenClassName = (width: number) => {
    return `absolute ${screenWidth(width)} h-100 bg-red-500`;
  };

  const num = () => {
    return "1/4";
  };
  const testStart = (length: number) => {
    const obj: any = [0, 0.5, 0.34, 0.04, 0.25];
    return obj[length];
  };

  const testEnd = (length: number) => {
    const obj: any = [0.5, 1, 0.56, 0.23, 0.88];
    return obj[length];
  };

  const width = (useWindowDimensions().width * 3) / 4;

  return (
    // <div className="w-[500px]">
    <div>
      <TimeSlider setDaysFromNow={setDaysFromNow} daysFromNow={daysFromNow} />
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
                  start={Math.ceil(testStart(trade.id) * width)}
                  end={Math.ceil((1 - testEnd(trade.id)) * width)}
                />
              </div>
            );
          })}
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
