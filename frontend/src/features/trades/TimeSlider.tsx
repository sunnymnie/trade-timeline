import React, { useEffect, useRef, useState } from "react";

export function TimeSlider(props: any) {
  return (
    <div className="bg-blue-100 flex w-full justify-start">
      <p>View range: </p>
      <input
        type="range"
        min="7"
        max="365"
        value={props.daysFromNow}
        onChange={(e) => props.setDaysFromNow(parseInt(e.target.value))}
      />
    </div>
  );
}

export default TimeSlider;
