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

function recursiveMap(sp, ep, sNum, eNum) {
  console.log();

  const xAvg = Math.floor((sp.x + ep.x) / 2);
  const yAvg = Math.floor((sp.y + ep.y) / 2);
  const numSum = Math.floor(sNum + eNum);

  console.log(sp, ep, sNum, eNum);
  if (sp.x + 1 === ep.x) {
    console.log(sNum);
    return;
  }
  // 1행
  if (sp.x <= row && row < xAvg) {
    // 1열
    if (sp.y <= col && col < yAvg) {
      console.log("1행 1열");

      recursiveMap({ ...sp }, { x: xAvg, y: yAvg }, sNum, numSum / 4);
    } else {
      console.log("1행 2열");
      // 2열
      recursiveMap(
        { x: sp.x, y: yAvg },
        { x: xAvg, y: ep.y },
        numSum / 4,
        numSum / 2
      );
    }
    // 2행
  } else {
    // 1열
    if (sp.y <= col && col < yAvg) {
      console.log("2행 1열");
      recursiveMap(
        { x: xAvg, y: sp.y },
        { x: ep.x, y: yAvg },
        numSum / 2,
        (numSum / 4) * 3
      );
    } else {
      console.log("2행 2열");
      // 2열
      recursiveMap({ x: xAvg, y: yAvg }, { ...ep }, (numSum / 4) * 3, eNum);
    }
  }
}

recursiveMap({ x: 0, y: 0 }, { x: 2 ** exp, y: 2 ** exp }, 0, 2 ** (2 * exp));
// console.log(num);
