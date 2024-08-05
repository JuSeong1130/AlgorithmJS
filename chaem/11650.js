const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const [_, ...posList] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trimEnd()
  .split("\n");

const posArray = posList.map((posStr) => posStr.split(" ").map(Number));

function compare(a, b) {
  return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
}

// 함수를 별도로 선언해서 넣어줘야함.
posArray.sort(compare).forEach((pos) => console.log(...pos));
