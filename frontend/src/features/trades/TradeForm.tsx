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
  //   const count = useAppSelector(selectCount);
  // const dispatch = useDispatch(); // could pass through props
  const dispatch = useDispatch<AppDispatch>();
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
  }

  //   const [incrementAmount, setIncrementAmount] = useState('2');

  //   const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <h2>Trade Form</h2>
      {props.selectedTrade ? <p>Selected trade</p> : <p>No selected trade</p>}
      <form>
        <div>
          <p>Title</p>
          <input
            type="text"
            name="title"
            className=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <p>Descripition</p>
          <textarea
            name="description"
            className=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <p>Start Date</p>
          <input
            type="date"
            name="start"
            className=""
            value={convertDateToString(start)}
            onChange={(e) => setStart(convertStringToDate(e.target.value))}
          />
        </div>
        <div>
          <p>End Date</p>
          <input
            type="date"
            name="end"
            className=""
            value={convertDateToString(end)}
            onChange={(e) => setEnd(convertStringToDate(e.target.value))}
          />
        </div>

        <button
          type="submit"
          onClick={
            props.selectedTrade
              ? (e) => updateHandler(e)
              : (e) => submitHandler(e)
          }
        >
          {props.selectedTrade ? "Update" : "Create"}
        </button>
        {props.selectedTrade && (
          <button type="button" onClick={(e) => deleteHandler(e)}>
            Delete
          </button>
        )}
      </form>
    </div>
  );
}

export default TradeForm;
