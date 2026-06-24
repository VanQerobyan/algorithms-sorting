import BucketedDeque from "./Deque.js"

class Stack {
  #data;
  #size;

  constructor(initialCapacity) {
    this.#size = 0;
    this.#data = new BucketedDeque(initialCapacity);
  }

  push(value) {
    this.#data.push_front(value);
    this.#size++;
  }

  pop() {
    if (this.isEmpty()) throw new Error("Stack is empty");
    this.#size--;
    return this.#data.pop_front();
  }

  peek() {
    return this.#data.front();
  }

  size() {
    return this.#size;
  }

  isEmpty() {
   return this.#size === 0;
  }

  clear() {
    this.#data.clear();
   this.#size = 0;
  }

  toArray() {
    return this.#data.toArray();
  }

  *[Symbol.iterator]() {
    let idx = 0;
    while (idx < this.#size ) {
      yield this.#data.at(idx++);
    }
  }
}


function runSimplePrintTest() {

  // --- STEP 1: BASIC PUSH, PEEK, AND POP ---
  console.log("\n🔹 [Step 1] Creating stack and pushing 10, 20, 30...");
  const stack = new Stack(4);
  stack.push(10);
  stack.push(20);
  stack.push(30);

  console.log(`-> Current Size: ${stack.size()}`);
  console.log(`-> Top Element (Peek): ${stack.peek()}`);
  
  console.log(`<- Popped element: ${stack.pop()}`);
  console.log(`<- Popped element: ${stack.pop()}`);
  console.log(`-> New Top Element (Peek): ${stack.peek()}`);
  console.log(`-> Remaining Size: ${stack.size()}`);

  // --- STEP 2: BUCKET BOUNDARY TRANSITION ---
  console.log("\n🔹 [Step 2] Testing bucket boundary transition (Capacity = 2)...");
  const boundaryStack = new Stack(2);
  boundaryStack.push(100);
  boundaryStack.push(200);
  console.log("   (Stack is now at capacity 2. Pushing 300 to force next bucket...)");
  boundaryStack.push(300);

  console.log(`-> Size after expansion: ${boundaryStack.size()}`);
  console.log(`-> Top element (Peek): ${boundaryStack.peek()}`);
  console.log(`<- Popped from expanded stack: ${boundaryStack.pop()}`);
  console.log(`-> New Top after pop: ${boundaryStack.peek()}`);

  // --- STEP 3: ITERATOR ORDER (FILO) ---
  console.log("\n🔹 [Step 3] Testing Iterator order...");
  const iterStack = new Stack(4);
  iterStack.push(1);
  iterStack.push(2);
  iterStack.push(3);

  console.log("-> Spreading stack elements via Iterator [...stack]:");
  console.log(`   Output:   [ ${[...iterStack].join(" -> ")} ]`);
  
  // --- STEP 4: TO_ARRAY METHOD ---
  console.log("\n🔹 [Step 4] Testing toArray() output...");
  const arrayStack = new Stack(4);
  arrayStack.push(50);
  arrayStack.push(60);
  arrayStack.push(70);

  const arr = arrayStack.toArray();
  console.log(`-> toArray() returned:`, arr);
  console.log(`-> Is it an actual Array?: ${Array.isArray(arr)}`);

  // --- STEP 5: CLEAR METHOD ---
  console.log("\n🔹 [Step 5] Testing clear() and reuse...");
  const clearStack = new Stack(4);
  clearStack.push(88);
  clearStack.push(99);
  console.log(`-> Size before clear: ${clearStack.size()}`);
  
  clearStack.clear();
  console.log(`-> Size after clear: ${clearStack.size()}`);
  console.log(`-> Is Empty: ${clearStack.isEmpty()}`);

  console.log("   Pushing new value (77) after clear...");
  clearStack.push(77);
  console.log(`-> Top element now: ${clearStack.peek()}`);
  console.log(`<- Popped: ${clearStack.pop()}`);

}

runSimplePrintTest();