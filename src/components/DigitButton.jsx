import { ACTIONS } from "/utils/actions";
import { useEffect } from "react";

export default function DigitButton({ digit, dispatch }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === digit) {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    //window.removeEventListener("keydown", handleKeyDown) is used to clean up the event listener when the component unmounts or digit changes
    // this prevents memory leaks and ensures that the event listener is only active when needed
    // if we didn't remove the event listener, it would keep listening for keydown events even after the component is unmounted or digit changes
    // this could lead to unexpected behavior, such as multiple event listeners being active at the same
  }, [digit, dispatch]);

  return (
    <button
      className="digit-button"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
