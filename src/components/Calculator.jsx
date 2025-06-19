// First we import `useState` with React so that we can take advantage of the hook
// hooks are functions that let you use state and other React features without writing a class
// hooks are defined functions that can be used in functional components to add state, lifecycle methods, etc.
// hooks include useState, useEffect, useContext, useReducer, useRef, useMemo, useCallback, useImperativeHandle, useLayoutEffect, useDebugValue
// useState is a hook that lets you add state to functional components
import { useState } from "react";
import { ACTIONS } from "/utils/actions";
import { useReducer } from "react";
import reducer from "/utils/reducers";
import DigitButton from "./DigitButton";
import OpertationButton from "./OpertationButton";
import FormatNumber from "./FormatNumber";

export default function Calculator() {
  // const [state,dispatch] = useReducer(reducer, {});
  // state was destructured into currentOperand, previousOperand, and operation
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );


  // for the digit buttons, we could use like this:
  // const handleDigitClick = (digit) => {
  //   dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
  // };
  // dispatch is a function that lets you send actions to the reducer
  // it takes an action object as an argument and updates the state based on the action type
  // some cases, payload is optional, but in this case, we are using it to pass the digit value to the reducer

  const handleClear = () => {
    dispatch({ type: ACTIONS.CLEAR });
  };
  const handleEvaluate = () => {
    dispatch({ type: ACTIONS.EVALUATE });
  };
  const handleDelete = () => {
    dispatch({ type: ACTIONS.DELETE_DIGIT });
  };

  return (
    <div className="calculator-container">
      <div className="calculator-grid">
        <div className="calculator-output">
          <div className="previous-operand">
            <FormatNumber operand={previousOperand} />
            {operation && <span className="operation">{operation}</span>}
          </div>

          <div className="current-operand">
            <FormatNumber operand={currentOperand} />
          </div>
        </div>

        {/* -----------buttons-------- */}
        <button className="span-two" onClick={handleClear}>
          AC
        </button>
        <button onClick={handleDelete}>DEL</button>
        <OpertationButton operation="±" dispatch={dispatch} />
        <OpertationButton operation="√" dispatch={dispatch} />
        <OpertationButton operation="%" dispatch={dispatch} />
        <OpertationButton operation="^" dispatch={dispatch} />

        <OpertationButton operation="/" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />

        <OpertationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />

        <OpertationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />

        <OpertationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />

        <button className="span-two" onClick={handleEvaluate}>=</button>
        {/* -----------buttons-------- */}
      </div>
    </div>
  );
}
