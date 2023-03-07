import React, { useEffect, useRef, useState } from "react";

export function TimeSlider(props: any) {
  return (
    <div className="border border-0 border-b-2 border-gray-400 flex w-full justify-start items-center">
      <div className="">
        <p>View range: </p>
      </div>
      <div>
        <input
          type="range"
          min="7"
          max="365"
          value={props.daysFromNow}
          onChange={(e) =>
            props.setDaysFromNow(Math.floor(parseFloat(e.target.value)))
          }
        />
      </div>
      <div>
        <button
          title="Show time bar"
          className={"" + (props.showVerticalTimeBar ? "" : "")}
          onClick={() =>
            props.setShowVerticalTimeBar(!props.showVerticalTimeBar)
          }
        >
          Time
        </button>{" "}
      </div>
    </div>
  );
}

export default TimeSlider;
