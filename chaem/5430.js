const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = require("fs").readFileSync(filePath).toString().trimEnd();

const [N, ...rest] = input.split("\n");

let tc = 0;

const result = [];
while (tc < N) {
  // 각 tc별로 사용할 데이터 가공
  const tcStart = tc++ * 3;
  const [strFncList, _, strNumList] = rest.slice(tcStart, tcStart + 3);
  const numList = JSON.parse(strNumList);
  const fncList = strFncList.split("");

  let startIndex = 0;
  let endIndex = numList.length;
  let direction = true; // 시작은 순차
  let isError = false;
  for (let i = 0; i < fncList.length; i++) {
    if (isError) break;
    switch (fncList[i]) {
      case "R":
        direction = !direction;
        break;
      case "D":
        if (direction) startIndex++;
        else endIndex--;
        break;
    }
    if (startIndex > endIndex) {
      isError = true;
    }
  }

  if (isError) {
    result.push("error");
    continue;
  }

  if (direction) result.push(`[${numList.slice(startIndex, endIndex)}]`);
  else result.push(`[${numList.slice(startIndex, endIndex).reverse()}]`);
}

console.log(result.join("\n"));
