import React, { useState } from "react";

const KellyCriterionCalculator = () => {
  const [winningProbability, setWinningProbability] = useState(50);
  const [fractionGained, setFractionGained] = useState(1);
  const [fractionLost, setFractionLost] = useState(1);
  const [result, setResult] = useState("");

  const calculateKellyCriterion = () => {
    const winProb = winningProbability / 100;
    const fractionGain = fractionGained - 1;
    const fractionLoss = 1 - fractionLost;

    // const kelly =
    //   (winProb * fractionGain - (1 - winProb) * fractionLoss) /
    //   (fractionGain - fractionLoss);
    const kelly = winProb / fractionLoss - (1 - winProb) / fractionGain;
    console.log(winProb, kelly, fractionGain, fractionLoss);

    setResult((kelly * 100).toFixed(2));
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold my-4">Kelly Criterion Calculator</h2>
      <div className="flex ">
        <label htmlFor="winningProbability" className="font-medium mb-1">
          Win-rate (%)
        </label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={winningProbability}
          onChange={(e) => setWinningProbability(parseFloat(e.target.value))}
          className="py-2 border rounded-lg"
        />
        {winningProbability}%
      </div>
      <div className="flex ">
        <label htmlFor="fractionGained" className="font-medium mb-1">
          Positive Outcome (1.1 for +10%)
        </label>
        <input
          type="number"
          min="0"
          step="0.1"
          value={fractionGained}
          onChange={(e) => setFractionGained(parseFloat(e.target.value))}
          className="px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="flex">
        <label htmlFor="fractionLost" className="font-medium mb-1">
          Negative outcome (0.9 for -10%)
        </label>
        <input
          type="number"
          min="0"
          step="0.1"
          value={fractionLost}
          onChange={(e) => setFractionLost(parseFloat(e.target.value))}
          className="px-3 py-2 border rounded-lg"
        />
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        onClick={calculateKellyCriterion}
      >
        Calculate
      </button>
      {result !== "" && (
        <p className="mt-4 text-xl font-medium">Allocation: {result}%</p>
      )}
    </div>
  );
};

export default KellyCriterionCalculator;
