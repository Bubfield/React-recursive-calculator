class Calculator_CLASS {
  #add(a, b) {
    return a + b;
  }

  #subtract(a, b) {
    return a - b;
  }

  #multiply(a, b) {
    return a * b;
  }

  #divide(a, b) {
    return a / b;
  }

  #calculate(a, b, operator) {
    if (operator === "+") {
      return this.#add(a, b);
    }

    if (operator === "-") {
      return this.#subtract(a, b);
    }

    if (operator === "x") {
      return this.#multiply(a, b);
    }

    if (operator === "/") {
      return this.#divide(a, b);
    }
  }

  evaluate(expression) {
    const operatorRegex = /[-+x/]/g;

    //base case
    if (
      !expression.match(operatorRegex) ||
      (expression[0] === "-" && expression.match(operatorRegex).length === 1)
    ) {
      if (expression.split("").find((val) => val === ".")) {
        return Number(Number(expression).toFixed(2));
      } else {
        return Number(expression);
      }
    }

    function determineType(value) {
      if (value === ".") {
        return "decimal";
      } else if (value.match(operatorRegex)) {
        return "operator";
      } else {
        return "number";
      }
    }

    let expressionObj = expression
      .split("")
      .map((item, index) => ({value: item, index, type: determineType(item)}));

    function findNumbers() {
      const numbers = [];
      let number = "";
      let indexOfNum = [];
      for (let i = 0; i < expressionObj.length; i++) {
        let obj = expressionObj[i];
        if (obj.type === "number" || obj.type === "decimal") {
          number += obj.value;
          indexOfNum.push(i);
        } else {
          if (number.length) {
            numbers.push({value: number, index: indexOfNum});
          }
          number = "";
          indexOfNum = [];
        }
      }
      numbers.push({value: number, index: indexOfNum});
      return numbers;
    }

    let numbers_nonNegativeVersion = findNumbers();

    function findNegativeNumbers(numbers) {
      function changeToNegative(num) {
        return "-" + num.value;
      }

      function updateIndex(num, i) {
        num.index.unshift(i);
        return num.index;
      }

      const operatorsToRemove = [];

      for (let i = 0; i < numbers.length; i++) {
        if (numbers[i].index[0] > 1) {
          const indexBeforeNumber = numbers[i].index[0] - 1;
          const valueOfIndexBeforeNumber =
            expressionObj[indexBeforeNumber].value;
          const typeOfIndexBeforeNumX2 =
            expressionObj[indexBeforeNumber - 1].type;

          if (
            valueOfIndexBeforeNumber === "-" &&
            typeOfIndexBeforeNumX2 === "operator"
          ) {
            numbers[i].value = changeToNegative(numbers[i]);
            numbers[i].index = updateIndex(numbers[i], indexBeforeNumber);
            operatorsToRemove.push(indexBeforeNumber);
          }
        } else {
          if (expressionObj[0].value === "-") {
            numbers[0].value = changeToNegative(numbers[0]);
            numbers[0].index = updateIndex(numbers[0], 0);
            operatorsToRemove.push(0);
          }
        }
      }

      return {numbers, operatorsToRemove};
    }

    let {numbers, operatorsToRemove} = findNegativeNumbers(
      numbers_nonNegativeVersion
    );

    let operators = expressionObj.filter(
      (item) =>
        item.type === "operator" && operatorsToRemove.indexOf(item.index) === -1
    );

    function addExtraPropertiesToOperators() {
      for (let i = 0; i < operators.length; i++) {
        operators[i].firstNumEndIndex = operators[i].index - 1;
        operators[i].secondNumStartIndex = operators[i].index + 1;
      }
      return operators;
    }

    operators = addExtraPropertiesToOperators();

    const multDivRegex = /[x/]/;
    const addSubRegex = /[+-]/;

    let firstNum;
    let operator;
    let secondNum;

    operator = operators.find((op) => op.value.match(multDivRegex));

    function executeCalculation(operator, thisObj) {
      firstNum = numbers.find(
        (num) => num.index[num.value.length - 1] === operator.firstNumEndIndex
      );
      secondNum = numbers.find(
        (num) => num.index[0] === operator.secondNumStartIndex
      );
      let result = thisObj.#calculate(
        Number(firstNum.value),
        Number(secondNum.value),
        operator.value
      );
      let a = expression.slice(0, firstNum.index[0]);
      let b = expression.slice(secondNum.index[secondNum.value.length - 1] + 1);
      return a + result + b;
    }

    let expressionAfterResult;

    if (operator) {
      expressionAfterResult = executeCalculation(operator, this);
    } else {
      operator = operators.find((op) => op.value.match(addSubRegex));
      expressionAfterResult = executeCalculation(operator, this);
    }

    return this.evaluate(expressionAfterResult);
  }
}

export const myCalculator = new Calculator_CLASS();
