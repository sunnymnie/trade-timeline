import React, { useState } from "react";

const KellyCriterionCalculator = () => {
  const [winningProbability, setWinningProbability] = useState(50);
  const [price, setPrice] = useState(0);
  const [winPrice, setWinPrice] = useState(0);
  const [lostPrice, setLostPrice] = useState(0);
  const [result, setResult] = useState("");
  const [kellyFraction, setKellyFraction] = useState(2);

  const calculateKellyCriterion = () => {
    const winProb = winningProbability / 100;
    const fractionGain = (winPrice - price) / price;
    const fractionLoss = (price - lostPrice) / price;

    // const kelly =
    //   (winProb * fractionGain - (1 - winProb) * fractionLoss) /
    //   (fractionGain - fractionLoss);
    const kelly = winProb / fractionLoss - (1 - winProb) / fractionGain;
    console.log(winProb, kelly, fractionGain, fractionLoss);

    setResult((kelly * 100).toFixed(2));
  };

  return (
    <div className="flex flex-col mx-4">
      <h2 className="text-2xl font-bold my-4">Kelly Criterion Calculator</h2>
      <div className="flex justify-between">
        <div className="">Win-rate (%)</div>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={winningProbability}
          onChange={(e) => setWinningProbability(parseFloat(e.target.value))}
          className="py-2 border rounded-lg"
        />
      </div>
      <div className="flex">
        <div className="text-left w-2/3 xl:w-1/2">Price: </div>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="100"
          value={price === 0 ? undefined : price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="bg-transparent w-1/3 xl:w-1/2 focus:outline-none focus:bg-blue-200"
        />
      </div>
      <div className="flex justify-between">
        <div className="text-left w-2/3 xl:w-1/2">Positive outcome price: </div>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="150"
          value={winPrice === 0 ? undefined : winPrice}
          onChange={(e) => setWinPrice(parseFloat(e.target.value))}
          className="bg-transparent w-1/3 xl:w-1/2 focus:outline-none focus:bg-blue-200"
        />
      </div>
      <div className="flex justify-between">
        <div className="text-left w-2/3 xl:w-1/2">Negative outcome price:</div>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="50"
          value={lostPrice === 0 ? undefined : lostPrice}
          onChange={(e) => setLostPrice(parseFloat(e.target.value))}
          className="bg-transparent w-1/3 xl:w-1/2 focus:outline-none focus:bg-blue-200"
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-200"
          // w-min mx-auto
          onClick={calculateKellyCriterion}
        >
          Calculate
        </button>
        <div className="flex">
          <button
            className={
              "py-2 px-4 rounded " +
              (kellyFraction === 1 ? "bg-gray-500 text-white" : "bg-gray-200")
            }
            onClick={() => setKellyFraction(1)}
          >
            1
          </button>
          <button
            className={
              "py-2 px-4 rounded " +
              (kellyFraction === 2 ? "bg-gray-500 text-white" : "bg-gray-200")
            }
            onClick={() => setKellyFraction(2)}
          >
            1/2
          </button>
          <button
            className={
              "py-2 px-4 rounded " +
              (kellyFraction === 4 ? "bg-gray-500 text-white" : "bg-gray-200")
            }
            onClick={() => setKellyFraction(4)}
          >
            1/4
          </button>
        </div>
      </div>

      {result !== "" && (
        <p className="mt-4 text-xl font-medium">
          {kellyFraction === 1
            ? "Kelly"
            : kellyFraction === 2
            ? "Half-kelly"
            : "Quarter-kelly"}
          : {parseFloat(result) / kellyFraction}%
        </p>
      )}
    </div>
  );
};

export default KellyCriterionCalculator;
