import React, { useState } from "react";

export function Trade(props: any) {
  //   const count = useAppSelector(selectCount);
  //   const dispatch = useAppDispatch();
  //   const [incrementAmount, setIncrementAmount] = useState('2');

  //   const incrementValue = Number(incrementAmount) || 0;

  const [title, setTitle] = useState(props.trade.title);
  const [description, setDescription] = useState(props.trade.description);

  return (
    <div>
      <h2 className="underline">{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default Trade;
