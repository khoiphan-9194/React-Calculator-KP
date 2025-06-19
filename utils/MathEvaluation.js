
import * as math from "mathjs";

export default function MathEvaluation({ currentOperand, previousOperand, operation }) {

  if (currentOperand == null || previousOperand == null || operation == null) {
    return ""; // Return empty string if any operand or operation is missing
  }

  const current = parseFloat(currentOperand);
  const previous = parseFloat(previousOperand);
  

  if (isNaN(current) || isNaN(previous)) {
    return ""; // Return empty string if either operand is not a number
  }

let computation;
  switch (operation) {
    case "+":
      computation = math.add(previous, current);
      break;
    case "-":
      computation = math.subtract(previous, current);
      break;
    case "*":
      computation = math.multiply(previous, current);
      break;
    case "÷":
    case "/":
      computation = math.divide(previous, current);
      break;

    case "±":
      computation = math.multiply(current, -1);
      break;
    case "√":
      computation = math.sqrt(current);
      break;
    case "%":
      
      computation = math.divide(current, 100);
      break;
    case "^":
      computation = math.pow(previous, current);
      break;
    default:
      return "";
  }
  return computation.toString();
}