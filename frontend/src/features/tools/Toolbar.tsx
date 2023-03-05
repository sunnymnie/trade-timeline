import React, { useState } from "react";
import KellyCriterionCalculator from "./Kelly";

enum Tool {
  kelly = "kelly",
}

const Toolbar = () => {
  const [activeTool, setActiveTool] = useState<Tool | undefined>(undefined);

  const updateActiveTool = (tool: Tool) => {
    if (activeTool === tool) {
      setActiveTool(undefined);
    } else {
      setActiveTool(tool);
    }
  };

  return (
    <div className="">
      <div
        className={
          activeTool && "mb-4 border border-0 border-t-2 border-gray-400"
        }
      >
        <div className="mx-4">
          {activeTool === Tool.kelly ? <KellyCriterionCalculator /> : ""}
        </div>
      </div>
      <div className="border border-gray-400 border-0 border-t-2 flex">
        <button
          title="Kelly Criterion Calculator"
          className={
            "py-2 px-4 rounded " +
            (activeTool === Tool.kelly
              ? "bg-gray-500 text-white"
              : "bg-gray-200")
          }
          onClick={() => updateActiveTool(Tool.kelly)}
        >
          Kelly
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
