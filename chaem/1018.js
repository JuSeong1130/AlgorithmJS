// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const [rc, ...strBoard] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trimEnd()
  .split("\r\n"); // 백준은 \n

const [r, c] = rc.split(" ").map(Number);
const board = strBoard.map((b) => b.split(""));

let result = 64;

for (let i = 0; i < r - 7; i++) {
  for (let j = 0; j < c - 7; j++) {
    let wFirstFixCnt = 0;
    let bFirstFixCnt = 0;
    for (let ii = 0; ii < 8; ii++) {
      for (let jj = 0; jj < 8; jj++) {
        // 영역 내 순회 중인 행(ii)과 열(jj)의 합이 홀수일때, "W"라면 시작이 "B"여야함.
        if ((ii + jj) % 2) {
          switch (board[i + ii][j + jj]) {
            case "W":
              wFirstFixCnt++;
              break;
            case "B":
              bFirstFixCnt++;
              break;
          }

          // 영역 내 순회 중인 행(ii)과 열(jj)의 합이 짝수일때, "W"라면 시작이 "W"여야함.
        } else {
          switch (board[i + ii][j + jj]) {
            case "W":
              bFirstFixCnt++;
              break;
            case "B":
              wFirstFixCnt++;
              break;
          }
        }
      }
    }
    result = Math.min(wFirstFixCnt, bFirstFixCnt, result);
  }
}

console.log(result);
