import React, { useEffect, useRef, useState } from "react";

export function Month(props: any) {
  return (
    <div
      className="bg-gray-200 shadow-md h-[2em] flex"
      style={{
        marginLeft: `${props.start}px`,
        marginRight: `${props.end}px`,
        marginTop: `${-props.top * 2}em`,
      }}
    >
      <div className="m-auto">
        {props.date.toLocaleString("default", { month: "short" })}
      </div>
    </div>
  );
}

export default Month;
