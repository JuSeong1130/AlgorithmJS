class MinHeap {
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
  push(num) {
    this.heap.push(num);
    this.bottomUpSort();
  }
  pop() {
    if (this.size() === 0) return 0;
    if (this.size() === 1) return this.heap.pop();
    const value = this.heap[0];
    this.heap[0] = this.heap[this.size() - 1];
    this.heap.pop();
    this.topDownSort();
    return value;
  }
  topDownSort() {
    let targetIndex = 0;
    const targetValue = this.heap[targetIndex];
    const size = this.size();
    while (true) {
      let childIndex1 = targetIndex * 2 + 1;
      let childIndex2 = targetIndex * 2 + 2;

      // 자식 노드가 없을 때
      if (childIndex1 > size - 1) {
        this.heap[targetIndex] = targetValue;
        break;
      }
      // 왼쪽 자식 노드만 존재할 때
      if (childIndex1 === size - 1) {
        // if(targetValue > this.heap[childIndex1])
        const minValue =
          targetValue > this.heap[childIndex1]
            ? this.heap[childIndex1]
            : targetValue;
        if (this.heap[childIndex1] === minValue) {
          this.heap[targetIndex] = minValue;
          this.heap[childIndex1] = targetValue;
          break;
        }
      }

      // 자식 노드 모두 존재할 때
      if (childIndex1 <= size - 1 && childIndex2 <= size - 1) {
        const minValue =
          targetValue < this.heap[childIndex1] &&
          targetValue < this.heap[childIndex2]
            ? targetValue
            : this.heap[childIndex1] < this.heap[childIndex2]
            ? this.heap[childIndex1]
            : this.heap[childIndex2];
        if (targetValue === minValue) {
          break;
        }
        if (this.heap[childIndex1] === minValue) {
          this.heap[targetIndex] = minValue;
          targetIndex = childIndex1;
        } else {
          this.heap[targetIndex] = minValue;
          targetIndex = childIndex2;
        }
      }
      this.heap[targetIndex] = targetValue;
    }
  }
  bottomUpSort() {
    let targetIndex = this.size() - 1;
    let targetValue = this.heap[targetIndex];
    let parentIndex = parseInt(targetIndex / 2);
    while (
      targetValue < this.heap[parentIndex] &&
      targetIndex !== parentIndex
    ) {
      this.heap[targetIndex] = this.heap[parentIndex];
      targetIndex = parentIndex;
      parentIndex = parseInt(targetIndex / 2);
    }
    this.heap[targetIndex] = targetValue;
  }
}

/** main */
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [_, ...numberList] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trimEnd()
  .split("\n")
  .map(Number);

const minheap = new MinHeap();

const result = [];
for (const num of numberList) {
  //   console.log(minheap.heap);
  if (num > 0) minheap.push(num);
  else result.push(minheap.pop());
  //   else minheap.pop();
}
console.log(result.join("\n"));
