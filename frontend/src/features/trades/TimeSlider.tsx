import React, { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useAppSelector, useAppDispatch } from "../../app/hooks";
// import { AppDispatch } from "../../app/store";

export function TimeSlider(props: any) {
  return (
    <div className="bg-green-100">
      <div>
        <input
          type="range"
          min="7"
          max="365"
          value={props.daysFromNow}
          onChange={(e) => props.setDaysFromNow(parseInt(e.target.value))}
        />
        <p>Days from now: {props.daysFromNow}</p>
      </div>
    </div>
  );
}

export default TimeSlider;
