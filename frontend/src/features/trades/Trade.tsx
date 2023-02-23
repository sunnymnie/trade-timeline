import React, { useEffect, useRef, useState } from "react";

export function Trade(props: any) {
  const [title, setTitle] = useState(props.trade.title);

  const clickOnTrade = () => {
    props.isSelectedTrade(props.trade)
      ? props.setSelectedTrade(undefined)
      : props.setSelectedTrade(props.trade);
  };

  return (
    <div className="my-2 whitespace-nowrap">
      <div
        className="bg-orange-100 shadow-md"
        style={{
          marginLeft: `${props.start}px`,
          marginRight: `${props.end}px`,
        }}
      >
        <div
          className={props.isSelectedTrade(props.trade) ? "bg-orange-200" : ""}
          onClick={clickOnTrade}
        >
          <div className="">{title}</div>
        </div>
      </div>
    </div>
  );
}

export default Trade;
