const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const N = Number(require("fs").readFileSync(filePath).toString().trimEnd());

/**
 * n개의 원판
 * f(n-1) + 1 + f(n-1)  // f(n-1): n-1개의 원판을 옮기는 경우의 수,
 *                      // but 우리는 경로(src, des)를 찾아야함.
 * f(1, src, des)       // "src des"
 * f(2, src, des)       // f(1, 1, not(src, des)) + "src des" + f(1, not(src, des), des)
 * f(3, src, des)       // f(2, 1, not(src, des)) + "src des" + f(2, not(src, des), des)
 *
 * f(n, src, des) = f(n-1, src, not(src, des)) + "src des" + f(n-1, src, not(src, des))
 * f(1, src, des) = "src des"
 */

const result = []; // 경로만 출력하는 것이 아닌, 총 이동횟수를 먼저 출력해야하므로 경로 임시 저장

function move(n, src, des) {
  if (n === 1) return result.push(`${src} ${des}`);
  move(n - 1, src, 6 - (src + des));
  result.push(`${src} ${des}`);
  move(n - 1, 6 - (src + des), des);
}

move(N, 1, 3);
console.log(result.length);
console.log(result.join("\n"));
