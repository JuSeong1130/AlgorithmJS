const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  // node 수, 간선 수, 간선 연결 정보
  let [N, _, ...edges] = input;

  N = Number(N);

  const connections = Array(N + 1)
    .fill(null)
    .map(() => []);

  edges.forEach((edge) => {
    const [from, to] = edge.split(" ").map((edge) => Number(edge));
    connections[from].push(to);
    connections[to].push(from);
  });

  solution(N, connections);
});

function solution(nodes, connections) {
  const visited = Array(nodes + 1).fill(false);

  dfs(1, visited, connections);
  console.log(visited.filter((b) => b).length - 1); // 1번 컴퓨터 제외
}

function dfs(node, visited, connections) {
  visited[node] = true;

  connections[node].forEach((nextNode) => {
    if (!visited[nextNode]) dfs(nextNode, visited, connections);
  });
}
