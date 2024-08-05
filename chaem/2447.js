const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const N = Number(require("fs").readFileSync(filePath).toString().trimEnd());

const square = new Array(N).fill(null).map((_) => new Array(N).fill(""));

function printStar(num) {
  if (num === 1) return "*";
  const bundle = Math.floor(num / 3);

  const starBundle = printStar(bundle);
  //   const emptyBundle = starBundle.flat(bundle).fill(" ").;

  const line = `${starBundle
    .split("\n")
    .map((bundleLine) => [...bundleLine, ...bundleLine, ...bundleLine].join(""))
    .join("\n")}\n${starBundle
    .split("\n")
    .map((bundleLine) =>
      [...bundleLine, " ".repeat(bundle), ...bundleLine].join("")
    )
    .join("\n")}\n${starBundle
    .split("\n")
    .map((bundleLine) => [...bundleLine, ...bundleLine, ...bundleLine].join(""))
    .join("\n")}`;

  return line;
}

const result = printStar(N);
console.log(result);
