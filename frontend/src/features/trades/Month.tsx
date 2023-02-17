import React, { useEffect, useRef, useState } from "react";

export function Month(props: any) {
  //   const count = useAppSelector(selectCount);
  //   const dispatch = useAppDispatch();
  //   const [incrementAmount, setIncrementAmount] = useState('2');

  //   const incrementValue = Number(incrementAmount) || 0;

  // const [isSelected, setIsSelected] = useState(false);

  // const [title, setTitle] = useState(props.trade.title);
  // const [description, setDescription] = useState(props.trade.description);

  // const clickOnTrade = () => {
  //   props.isSelectedTrade(props.trade)
  //     ? props.setSelectedTrade(undefined)
  //     : props.setSelectedTrade(props.trade);
  // };

  return (
    <div
      className="bg-orange-200 shadow-md h-[2em]"
      style={{
        // width: `${Math.ceil(50)}%`,
        marginLeft: `${props.start}px`,
        marginRight: `${props.end}px`,
        marginTop: `${-props.top * 2}em`,
      }}
    >
      {/* <div className="bg-orange-500"> */}
      {props.date.toLocaleString("default", { month: "long" })}
      {/* </div> */}
      {/* <div>Margin top: {-props.top * 20}</div> */}
    </div>
  );
}

export default Month;
