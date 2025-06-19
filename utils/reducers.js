import { ACTIONS } from "./actions";
import MathEvaluation from "./MathEvaluation";

export default function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overide) {
        return {
          ...state,
          currentOperand: payload.digit,
          overide: false, // Reset override after setting a new digit
        };
      }

      if (payload.digit === "0" && state.currentOperand === "0") {
        return state; // Ignore leading zeros
      }

      if (payload.digit === "." && state.currentOperand?.includes(".")) {
        return state; // Ignore multiple decimal points
      }

     

      return {
        ...state,
        currentOperand: `${state.currentOperand  || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      //operation="√"
      // Handle square root operation
      // if (payload.operation === "√") {
      //   // If no currentOperand, set operation to "√" and clear currentOperand to allow digit input
      //   if (state.currentOperand == null) {
      //     return {
      //       ...state,
      //       operation: payload.operation,
      //       previousOperand:"0"

      //     };
      //   }

      // }

      if (state.currentOperand == null && state.previousOperand == null) {
        return state; // Ignore if both operands are null
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: null,
          operation: payload.operation,
        };
      }

      // since when we choose an operation,
      // the function will set currentOperand to null and previousOperand to currentOperand
      // let say if we have 5 + 3 and we accidentally click on + again or any other operation,
      // it will only update the operation
      // and not change the previousOperand or currentOperand
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }; // Update operation only if current operand is null
      }

      return {
        ...state,

        previousOperand: MathEvaluation({
          currentOperand: state.currentOperand,
          previousOperand: state.previousOperand,
          operation: state.operation,
        }),
        currentOperand: null,
        operation: payload.operation,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.EVALUATE:
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operation == null
      ) {
        return state; // Ignore evaluation if any operand or operation is missing
      }

     

      return {
        ...state,
        overide: true, // This is used to override the current operand with the result,
        // so that the next digit input by the user will start a new calculation
        previousOperand: null,
        operation: null,
        currentOperand: MathEvaluation({
          currentOperand: state.currentOperand,
          previousOperand: state.previousOperand,
          operation: state.operation,
        }),
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.overide)
        // If we are in override mode, reset the current operand
        return {
          ...state,
          currentOperand: null,
          overide: false, // Reset override when deleting a digit
        };
      if (state.currentOperand == null) return state; // Ignore if current operand is null
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null, // Reset current operand if it has only one digit
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1), // Remove the last digit
      };

    default:
      return state;
  }
}
