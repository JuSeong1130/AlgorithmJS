const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = require("fs").readFileSync(filePath).toString().trimEnd();

const [_, strNumList, strOperator] = input.split("\n");

const numList = strNumList.split(" ").map(Number);

const operatorMap = {};
const OPERATORS = ["+", "-", "*", "/"];
strOperator
  .split(" ")
  .map(Number)
  .forEach((operatorCnt, index) => {
    operatorMap[OPERATORS[index]] = operatorCnt; //  {"+": 3, "-": 0, ...}
  });

const result = [];

// 현재 값과 사용할 수 있는 남은 연산자 리스트
function calc(value, restNumList, restOperators) {
  const copyRestNumList = [...restNumList];
  const copyRestOperators = { ...restOperators };

  if (restNumList.length === 0) return result.push(value);

  const num = copyRestNumList.shift();

  for (let i = 0; i < OPERATORS.length; i++) {
    const operator = OPERATORS[i];
    if (copyRestOperators[operator] === 0) continue;

    const temp = parseInt(eval(`${value}${operator}${num}`));
    calc(temp, copyRestNumList, {
      ...copyRestOperators,
      [operator]: copyRestOperators[operator] - 1,
    });
  }
}

const startNum = numList.shift();
calc(startNum, numList, operatorMap);

const max = Math.max(...result);
const min = Math.min(...result);

console.log(max === 0 ? 0 : max, min === 0 ? 0 : min);
