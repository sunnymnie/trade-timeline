import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { createTradeAsync, TradeFormData } from "./tradeSlice";

export function TradeForm() {
  //   const count = useAppSelector(selectCount);
  // const dispatch = useDispatch(); // could pass through props
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function submitHandler(e: any) {
    e.preventDefault();
    const formData: TradeFormData = {
      trade: {
        title: title,
        description: description,
      },
    };
    dispatch(createTradeAsync(formData));
    resetState();
  }

  function resetState() {
    setTitle("");
    setDescription("");
  }

  //   const [incrementAmount, setIncrementAmount] = useState('2');

  //   const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <h2>Trade Form</h2>
      <form>
        <input
          type="text"
          name="title"
          className=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="description"
          className=""
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" onClick={(e) => submitHandler(e)}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default TradeForm;
