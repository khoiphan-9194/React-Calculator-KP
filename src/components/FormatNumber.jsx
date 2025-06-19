export default function FormatNumber({ operand }) {
  // The INTEGER_FORMATTER is used to format the integer part of the operand
  // It uses the Intl.NumberFormat API to format numbers according to the specified locale and options
  // In this case, it formats numbers in the "en-us" locale with a maximum of 0 fraction digits
  // This means that it will not show any decimal places for whole numbers
  // For example, it will format 1000 as "1,000" and 1000.5 as "1,000.5"

  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  });

  const MAX_LENGTH = 12;

  // The formatOperand function is used to format the operand for display
  const formatOperand = () => {
    if (operand == null) return ""; // Return empty string if operand is null
    if (operand === "NaN") return "Error"; // Handle NaN case
    if (operand === "Infinity") return "∞"; // Handle Infinity case
    // if the operand is a string and its length exceeds the maximum length,
    // we will format it in exponential notation if it's a valid number,
    if (operand.length > MAX_LENGTH) {
      // Show in exponential notation if too long
      // Convert the operand to a number and format it in exponential notation
      const num = Number(operand);
      // if num is a valid number, format it in exponential notation
      if (!isNaN(num)) {
        return num.toExponential(6);
      }
      // otherwise, return the operand truncated with an ellipsis
      //truncated means that we will show only the first 12 characters of the operand
      // ellipsis means that we will add "…" at the end of the operand to indicate that it has been truncated
      // like this 1234567890 will be shown as 1234567890…
      // this is to prevent the operand from overflowing the display area
      return operand.slice(0, MAX_LENGTH) + "…";
    }
    const [integer, decimal] = operand.split(".");
    if (decimal == null) {
      return INTEGER_FORMATTER.format(integer);
    }
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
  };

  return (
    <div className="operand">
      {formatOperand()} {/* Call the formatOperand function to display the formatted operand */}
    </div>
  );
}
