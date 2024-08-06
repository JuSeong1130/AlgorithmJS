const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const [exp, row, col] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trimEnd()
  .split(" ")
  .map(Number);

// const map = Array(2 ** exp)
//   .fill(null)
//   .map(() => Array(2 ** exp).fill(0));

let num = 0;
let isFound = false;
function recursiveMap(sp, ep) {
  const unit = Math.floor((ep[0] - sp[0]) / 2);

  if (ep[0] - sp[0] === 1) {
    if (sp[0] === row && sp[1] === col) {
      isFound = true;
      return num;
    }
    return num++;
  }
  for (let i = sp[0]; i < ep[0]; i += unit) {
    for (let j = sp[1]; j < ep[1]; j += unit) {
      recursiveMap([i, j], [i + unit, j + unit]);
      if (isFound) return;
    }
  }
}

recursiveMap([0, 0], [2 ** exp, 2 ** exp]);
console.log(num);
