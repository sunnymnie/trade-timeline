import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  createTradeAsync,
  destroyTradeAsync,
  updateTradeAsync,
  TradeFormData,
  TradeDeleteData,
} from "./tradeSlice";

export function TradeForm(props: any) {
  const dispatch = props.dispatch;
  const [title, setTitle] = useState(
    props.selectedTrade ? props.selectedTrade.title : ""
  );
  const [description, setDescription] = useState(
    props.selectedTrade ? props.selectedTrade.description : ""
  );
  const [start, setStart] = useState(
    props.selectedTrade ? props.selectedTrade.start : undefined
  );
  const [end, setEnd] = useState(
    props.selectedTrade ? props.selectedTrade.end : undefined
  );

  const convertDateToString = (date?: Date) => {
    if (!date) return "";
    try {
      let newDate = date.toISOString().split("T")[0];
      return newDate;
    } catch (e) {
      console.log("ERROR: ", e);
      return "";
    }
  };

  const convertStringToDate = (dateString: string) => {
    return new Date(dateString);
  };

  useEffect(() => {
    if (props.selectedTrade) {
      setTitle(props.selectedTrade.title);
      setDescription(props.selectedTrade.description);
      setStart(props.selectedTrade.start);
      setEnd(props.selectedTrade.end);
    } else {
      resetState();
    }
  }, [props.selectedTrade]);

  function submitHandler(e: any) {
    e.preventDefault();
    const formData: TradeFormData = {
      trade: {
        title: title,
        description: description,
        start: start.toISOString(),
        end: end.toISOString(),
      },
    };
    console.log("Submitting trade with start date: ", start);
    dispatch(createTradeAsync(formData));
    resetState();
  }

  function updateHandler(e: any) {
    e.preventDefault();
    const formData: TradeFormData = {
      trade: {
        id: props.selectedTrade.id,
        title: title,
        description: description,
        start: start.toISOString(),
        end: end.toISOString(),
      },
    };
    dispatch(updateTradeAsync(formData));
    resetState();
  }

  function deleteHandler(e: any) {
    e.preventDefault();
    const payload: TradeDeleteData = {
      trade: {
        trade_id: props.selectedTrade.id,
      },
    };
    props.dispatch(destroyTradeAsync(payload));
    resetState();
  }

  function resetState() {
    setTitle(props.selectedTrade ? props.selectedTrade.title : "");
    setDescription(props.selectedTrade ? props.selectedTrade.description : "");
    setStart(props.selectedTrade ? props.selectedTrade.start : undefined);
    setEnd(props.selectedTrade ? props.selectedTrade.end : undefined);
  }

  return (
    <form className="flex-col h-full space-y-4 mx-4">
      <div className="">
        <input
          type="text"
          name="title"
          className="text-2xl font-bold w-full text-center bg-transparent focus:outline-none focus:bg-blue-200"
          placeholder="New Trade Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <div className="flex space-x-2">
          <p>Start: </p>
          <input
            type="date"
            name="start"
            className="bg-transparent focus:outline-none focus:bg-blue-200"
            value={convertDateToString(start)}
            onChange={(e) => setStart(convertStringToDate(e.target.value))}
          />
        </div>
        <div className="flex space-x-2">
          <p>End: </p>
          <input
            type="date"
            name="end"
            className="bg-transparent focus:outline-none focus:bg-blue-200"
            value={convertDateToString(end)}
            onChange={(e) => setEnd(convertStringToDate(e.target.value))}
          />
        </div>
      </div>
      <div className="grow">
        <textarea
          name="description"
          placeholder="New Trade Description"
          className="h-full w-full bg-transparent focus:outline-none focus:bg-blue-200"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-evenly">
        <button
          type="submit"
          className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={
            props.selectedTrade
              ? (e) => updateHandler(e)
              : (e) => submitHandler(e)
          }
        >
          {props.selectedTrade ? "Update" : "Create"}
        </button>
        {props.selectedTrade && (
          <button
            type="button"
            className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => deleteHandler(e)}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

export default TradeForm;
