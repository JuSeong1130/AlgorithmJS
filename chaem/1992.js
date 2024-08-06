const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const [N, ...video] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trimEnd()
  .split("\r\n");

const n = Number(N);
const pixels = video.map((line) => line.split("").map(Number));

function compressVideo(sp, ep) {
  let isDiff = false;
  const standard = pixels[sp[0]][sp[1]];
  const unit = Math.floor((ep[0] - sp[0]) / 2);

  //   if (unit < 1) return pixels[sp[0]][sp[1]];
  //  주어진 영역이 모두 같은 값을 가지는지 판별
  if (ep[0] - sp[0] === 0) return pixels[sp[0]][sp[1]].toString();
  for (i = sp[0]; i < ep[0]; i++) {
    for (j = sp[1]; j < ep[1]; j++) {
      if (standard !== pixels[i][j]) {
        isDiff = true;
      }
    }
    if (isDiff) break;
  }
  // 다르다면
  if (isDiff) {
    let result = "";
    for (let ii = sp[0]; ii < ep[0]; ii += unit) {
      for (let jj = sp[1]; jj < ep[1]; jj += unit) {
        result += compressVideo([ii, jj], [ii + unit, jj + unit]);
      }
    }
    return `(${result})`;
  }
  return standard.toString();
}

console.log(`${compressVideo([0, 0], [n, n])}`);
