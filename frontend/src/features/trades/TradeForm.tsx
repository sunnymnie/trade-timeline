import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import Button from "../../common/Button";
import { ButtonVariant } from "../../types/Button";
import KellyCriterionCalculator from "../tools/Kelly";
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const parent = textarea.parentElement;
      if (parent) {
        const parentHeight = parent.offsetHeight;
        const textareaHeight = textarea.scrollHeight;
        if (textareaHeight < parentHeight / 2) {
          textarea.style.height = "auto";
          textarea.style.height = textareaHeight + "px";
        }
      }
    }
  }, [description]);

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
    <div>
      <form className="flex-col h-full space-y-4 mx-4 my-4">
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
        {/* <div className="h-auto overflow-hidden">
        <textarea
          name="description"
          placeholder="New Trade Description"
          className="min-h-[0] w-full bg-transparent focus:outline-none focus:bg-blue-200"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div> */}
        {/* <div> */}
        <textarea
          ref={textareaRef}
          name="description"
          placeholder="New Trade Description"
          className="w-full bg-transparent focus:outline-none focus:bg-blue-200"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* </div> */}
        {/* <div className="h-full flex flex-col">
        <textarea
          ref={textareaRef}
          name="description"
          placeholder="New Trade Description"
          className="w-full max-h-[50%] px-2 py-1 border rounded resize-none overflow-auto"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div> */}
        <div className="flex justify-evenly">
          {/* <button
            type="submit"
            className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={
              props.selectedTrade
                ? (e) => updateHandler(e)
                : (e) => submitHandler(e)
            }
          >
            {props.selectedTrade ? "Update" : "Create"}
          </button> */}
          <Button
            variant={ButtonVariant.primary}
            type="submit"
            onClick={
              props.selectedTrade
                ? (e) => updateHandler(e)
                : (e) => submitHandler(e)
            }
          >
            {props.selectedTrade ? "Update" : "Create"}
          </Button>
          {props.selectedTrade && (
            // <button
            //   type="button"
            //   className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            //   onClick={(e) => deleteHandler(e)}
            // >
            //   Delete
            // </button>
            <Button
              variant={ButtonVariant.danger}
              type="button"
              onClick={(e) => deleteHandler(e)}
            >
              Delete
            </Button>
          )}
        </div>
      </form>
      <div>
        <KellyCriterionCalculator />
      </div>
    </div>
  );
}

export default TradeForm;
