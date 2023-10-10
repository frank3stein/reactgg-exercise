import * as React from "react";

const initialState = {
  past: [],
  present: 0,
  future: []
};

function reducer(state, action) {
  const { past, present, future } = state;
  switch(action.type) {
  case "INCREMENT":
    return {
      past: [...past, present],
      present: present + 1,
      future: []
    };
  case "DECREMENT":
    return {
      past: [...past, present],
      present: present - 1,
      future: []
    };
  case "UNDO":
    return {
      // slice is used to remove the last element from the array
      past: past.slice(0, past.length - 1),
      present: past[past.length - 1],
      future: [present, ...future]
    };
  case "REDO":
    return {
      past: [...past, present],
      present: future[0],
      // slice is used to remove the first element from the array
      future: future.slice(1)
    };
    default:
      return state;
  }
}

export default function CounterWithUndoRedo() {
  // const state = initialState;
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleIncrement = () => {
    dispatch({ type: "INCREMENT" })
  };
  const handleDecrement = () => {
    dispatch({ type: "DECREMENT" })
  };
  const handleUndo = () => {
    dispatch({ type: "UNDO" })
  };
  const handleRedo = () => {
    dispatch({ type: "REDO" })
  };

  return (
    <div>
      <h1>Counter: {state.present}</h1>
      <button className="link" onClick={handleIncrement}>
        Increment
      </button>
      <button className="link" onClick={handleDecrement}>
        Decrement
      </button>
      <button
        className="link"
        onClick={handleUndo}
        disabled={!state.past.length}
      >
        Undo
      </button>
      <button
        className="link"
        onClick={handleRedo}
        disabled={!state.future.length}
      >
        Redo
      </button>
    </div>
  );
}
