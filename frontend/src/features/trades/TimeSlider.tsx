import React, { useEffect, useRef, useState } from "react";

export function TimeSlider(props: any) {
  return (
    <div className="border border-0 border-b-2 border-gray-400 flex w-full justify-start">
      <p>View range: </p>
      <input
        type="range"
        min="7"
        max="365"
        value={props.daysFromNow}
        onChange={(e) =>
          props.setDaysFromNow(Math.floor(parseFloat(e.target.value)))
        }
      />
      {props.daysFromNow}
    </div>
  );
}

export default TimeSlider;
