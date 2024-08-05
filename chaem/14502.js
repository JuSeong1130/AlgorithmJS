// 1,2가 없는 곳중에서 세 군데 선점.

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const [rc, ...strLab] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trimEnd()
  .split("\n");

const [r, c] = rc.split(" ").map(Number);
const lab = strLab.map((l) => l.split(" ").map(Number));

const nowLab = Array(r)
  .fill([])
  .map((_, i) => [...lab[i]]);

const available = []; // 벽을 세울 수 있는 곳 [ [x, y], ... ]
const virus = []; // 초기 바이러스 좌표 [ [x, y], ... ]

for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    switch (lab[i][j]) {
      case 0:
        available.push([i, j]);
        break;
      case 2:
        virus.push([i, j]);
        break;
    }
  }
}

let result = 0; // N <= 3, M <=8

const DX = [1, -1, 0, 0];
const DY = [0, 0, 1, -1];

for (let idx = 0; idx < available.length; idx++) {
  const [i, j] = available[idx];
  nowLab[i][j] = 1;
  for (let idx2 = idx + 1; idx2 < available.length; idx2++) {
    const [i2, j2] = available[idx2];
    nowLab[i2][j2] = 1;
    for (let idx3 = idx2 + 1; idx3 < available.length; idx3++) {
      const [i3, j3] = available[idx3];
      nowLab[i3][j3] = 1;
      result = Math.max(result, calcBFS());
      nowLab[i3][j3] = 0;
    }
    nowLab[i2][j2] = 0;
  }
  nowLab[i][j] = 0;
}

console.log(result);

function calcBFS() {
  const queue = [...virus];
  const visited = Array(r)
    .fill([])
    .map((_, i) => [...nowLab[i].map((i) => (i === 0 ? false : true))]);

  while (queue.length) {
    const [x, y] = queue.shift();
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
      const nx = x + DX[i];
      const ny = y + DY[i];
      if (nx >= 0 && nx < r && ny >= 0 && ny < c && !visited[nx][ny]) {
        queue.push([nx, ny]);
      }
    }
  }

  return visited.reduce((acc, curr) => acc + curr.filter((b) => !b).length, 0);
}
