const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const [NM, ...city] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trimEnd()
  .split("\r\n");

const [n, m] = NM.split(" ").map(Number);
const blocks = city.map((line) => line.split("").map(Number));

const chickenHouse = [];
const house = [];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (blocks[i][j] === 0) continue;
    if (blocks[i][j] === 1) house.push([i, j]);
    else chickenHouse.push([i, j]);
  }
}

const distance = { ...house };
console.log(distance);

function bfs() {
  const queue = [];
}
