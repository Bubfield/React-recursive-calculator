import InputScreen from "./InputScreen";
import FirstRow from "./FirstRow";
import SecondRow from "./SecondRow";
import ThirdRow from "./ThirdRow";
import FourthAndFifthRow from "./FourthAndFifthRow";
import {useState} from "react";
import {myCalculator} from "../classes/Calculator";

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [bottomInput, setBottomInput] = useState(0);
  const [isResult, setIsResult] = useState(false);

  function handleExpressionTooLong() {
    if (expression.length > 20) {
      setBottomInput("EXPRESSION TOO LONG");
      setExpression("");
      return true;
    }

    if (String(bottomInput).match(/E/)) {
      setBottomInput("");
    }
  }

  function handleClickOnNumber(e) {
    const number = e.target.textContent;
    const operatorsRegex = /[-+x/]/;

    if (handleExpressionTooLong()) return;

    if (isResult) {
      setExpression(number);
      setBottomInput(number);
      setIsResult(false);
    } else {
      setExpression((prev) => (prev += number));
    }

    if (bottomInput === 0 || bottomInput.match(operatorsRegex)) {
      setBottomInput(number);
    } else {
      setBottomInput((prev) => (prev += number));
    }
  }

  function handleClickOnOperator(e) {
    const operator = e.target.textContent;

    if (handleExpressionTooLong()) return;

    if (isResult) {
      let resultNum = bottomInput;
      setExpression((resultNum += operator));
      setIsResult(false);
    } else {
      setExpression((prev) => (prev += operator));
    }

    setBottomInput(operator);
  }

  function handleClickOnEqualSign() {
    const result = myCalculator.evaluate(expression);
    if (result !== undefined && !isNaN(result)) {
      setExpression((prev) => prev + "=" + result);
      setBottomInput(result);
      setIsResult(true);
    } else {
      return;
    }
  }

  function handleClickOnAllClear() {
    setExpression("");
    setBottomInput(0);
    setIsResult(false);
  }

  function handleClickOnDecimal() {
    if (handleExpressionTooLong()) return;

    if (bottomInput === 0) {
      setExpression(0 + ".");
    } else {
      setExpression((prev) => (prev += "."));
    }

    setBottomInput((prev) => (prev += "."));
  }

  return (
    <div id="calculator-outer-div">
      <InputScreen props={{expression, bottomInput}} />
      <FirstRow props={{handleClickOnAllClear, handleClickOnOperator}} />
      <SecondRow props={{handleClickOnNumber, handleClickOnOperator}} />
      <ThirdRow props={{handleClickOnNumber, handleClickOnOperator}} />
      <FourthAndFifthRow
        props={{
          handleClickOnEqualSign,
          handleClickOnNumber,
          handleClickOnDecimal,
        }}
      />
    </div>
  );
}
