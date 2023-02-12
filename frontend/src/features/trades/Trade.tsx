import React, { useEffect, useRef, useState } from "react";

export function Trade(props: any) {
  //   const count = useAppSelector(selectCount);
  //   const dispatch = useAppDispatch();
  //   const [incrementAmount, setIncrementAmount] = useState('2');

  //   const incrementValue = Number(incrementAmount) || 0;

  const [isSelected, setIsSelected] = useState(false);

  const [title, setTitle] = useState(props.trade.title);
  const [description, setDescription] = useState(props.trade.description);

  const clickOnTrade = () => {
    props.isSelectedTrade(props.trade)
      ? props.setSelectedTrade(undefined)
      : props.setSelectedTrade(props.trade);
  };

  return (
    <div
      className={"bg-orange-200"}
      style={{
        // width: `${Math.ceil(50)}%`,
        marginLeft: `${props.start}px`,
        marginRight: `${props.end}px`,
      }}
    >
      <div
        className={
          props.isSelectedTrade(props.trade) ? "border-2 border-blue-300" : ""
        }
        onClick={clickOnTrade}
      >
        <div>
          start: {props.start}, end: {props.end}
        </div>
        <h2 className="underline">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Trade;
