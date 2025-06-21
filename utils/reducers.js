import { ACTIONS } from "./actions";
import MathEvaluation from "./MathEvaluation";

export default function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.override) {
        return {
          ...state,
          currentOperand: payload.digit,
          override: false, // Reset override after setting a new digit
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
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      //operation="√"
      // Handle square root operation
      if (payload.operation === "√") {
        // If currentOperand is null, we will set it to "0"
        // and set previousOperand to null and operation to null
        // This is to avoid errors when the user clicks on the square root button
        // when there is no currentOperand or previousOperand
        if (!state.currentOperand && !state.previousOperand) {
          return {
            ...state,
            currentOperand: "0",
            previousOperand: null,
            operation: null,
          };
        }

        // If currentOperand exists, we will calculate the square root of it
        // and set the currentOperand to the result
        if (state.currentOperand) {
          return {
            ...state,
            currentOperand: MathEvaluation({
              currentOperand: state.currentOperand,
              previousOperand: "0", // Use "0" as previousOperand for square root calculation
              operation: payload.operation,
            }),
            override: true, // Set override to true to allow next digit input
          };
        }

        // Default fallback
        return state;
      }
      // Handle exponentiation operation


    

      // Handle percentage operation
      // if we have a currentOperand and the user clicks on the percentage button,
      // we will calculate the percentage of the currentOperand
      // and set the currentOperand to the result
      if (payload.operation === "%" && state.currentOperand != null) {
        return {
          ...state,
          currentOperand: MathEvaluation({
            currentOperand: state.currentOperand,
            previousOperand: "0", // Use "0" as previousOperand for percentage calculation
            // This is to ensure that the percentage operation works correctly
            // when the user clicks on the percentage button
            operation: payload.operation,
          }),

          override: true, // Set override to true to allow next digit input

          // Keep previousOperand and operation unchanged for single operand %
        };
      }

      // Handle negation operation (±)
      // If the operation is "±", we will do the following:
      if (payload.operation === "±") {
        // If both operands are null, set currentOperand to "0"
        // and set previousOperand and operation to null
        // This is to avoid errors when the user clicks on the ± button when there is no currentOperand or previousOperand
        if (!state.currentOperand && !state.previousOperand) {
          return {
            ...state,
            currentOperand: "0",
            previousOperand: null,
            operation: null,
          };
        }

        // If currentOperand is null, and previousOperand exists, then we will negate the previousOperand
        // for example, suppose we want to do 5 + 3 but we changed our mind
        // and we want to negate the 5 after we clicked +, it is supposed to be -5+3
        // what will happen is as 5 is now the previousOperand and currentOperand is null when we click + button,
        // then we will negate the previousOperand
        // and set the operation to null, so that the next digit input will start a new calculation

        if (!state.currentOperand && state.previousOperand) {
          // Toggle sign, handle double negatives

          let negated = MathEvaluation({
            currentOperand: state.previousOperand,
            previousOperand: "0",
            operation: payload.operation,
          });
          return {
            ...state,

            previousOperand: negated,
            operation: null,
            override: true,
          };
        }

        // If currentOperand exists, negate it (handle double negatives)
        // in the other word, if we have a currentOperand
        // and we click on the ± button, it will negate the currentOperand
        // and set the override to true to allow next digit input
        // This is to ensure that the next digit input by the user will start a new calculation
        // and not append to the negated currentOperand
        // This is useful when the user clicks on the ± button
        // when there is a currentOperand
        // and we want to negate it
        if (state.currentOperand) {
          let negated = MathEvaluation({
            currentOperand: state.currentOperand,
            previousOperand: "0",
            operation: payload.operation,
          });
          return {
            ...state,
            currentOperand: negated,
            override: true,
          };
        }

        // Default fallback
        return state;
      }

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
        override: true, // This is used to override the current operand with the result,
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
      if (state.override)
        // If we are in override mode, reset the current operand
        return {
          ...state,
          currentOperand: null,
          override: false, // Reset override when deleting a digit
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
