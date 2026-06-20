class Stack {
    #data;
    #size;
    #capacity;

constructor(initialCapacity = 8) {
    if (!Number.isInteger(initialCapacity)) throw new Error("InitialCapacity must be an integer");
    if (initialCapacity <= 0) throw new Error("Initial capacity must be an positive");
    this.#capacity = initialCapacity;
    this.#data = new Array(this.#capacity);
    this.#size = 0;
}

  push(value) {
    if (this.#size === this.#capacity) this.#ensureStack();
    this.#data[this.#size] = value;
    this.#size++;
  }

  pop() {
    if (this.isEmpty()) throw new Error("Stack is empty");
    this.#size--;
    let elem = this.#data[this.#size];
    return elem;
  }

  peek() {
    if (this.isEmpty()) throw new Error("Stack is empty");
    return this.#data[this.#size - 1];
  }

  size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

  clear() {
    this.#data = new Array(this.#capacity);
    this.#size = 0;
  }

  toArray() {
    let arr = [];
    let idx = this.#size;
    if (this.isEmpty()) return arr;
    while (idx--) {
      arr.push(this.#data[idx]);
    }
    return arr;
  }

  *[Symbol.iterator]() {
    let idx = this.#size;
    while (idx--) {
      yield this.#data[idx];
    }
  }

  #ensureStack() {
    let newCapacity = this.#capacity*2;
    let newArr = new Array(newCapacity);

    for (let i = 0; i < this.#size; ++i) {
      newArr[i] = this.#data[i];
    }
    this.#capacity = newCapacity;
    this.#data = newArr;
  }
}


function runStackTests() {

  try {
    // 1. Initialization
    console.log("[STEP 1] Initializing a new Stack with capacity 3...");
    const stack = new Stack(3);
    console.log(`-> Size: ${stack.size()} (Expected: 0)`);
    console.log(`-> Is Empty: ${stack.isEmpty()} (Expected: true)\n`);

    // 2. Testing Push Operations
    console.log("[STEP 2] Pushing elements into the stack...");
    console.log("-> Pushing: 10"); stack.push(10);
    console.log("-> Pushing: 20"); stack.push(20);
    console.log(`-> Current Top (Peek): ${stack.peek()} (Expected: 20)`);
    console.log(`-> Current Size: ${stack.size()} (Expected: 2)\n`);

    // 3. Testing Dynamic Resizing
    console.log("[STEP 3] Testing dynamic resizing (Pushing past capacity)...");
    console.log("-> Pushing: 30 (Stack is now full: 3/3)"); stack.push(30);
    console.log("-> Pushing: 40 (This triggers auto-resize to capacity 6)"); stack.push(40);
    console.log(`-> Current Size after resize: ${stack.size()} (Expected: 4)`);
    console.log(`-> Current Top (Peek): ${stack.peek()} (Expected: 40)\n`);

    // 4. Testing toArray Method
    console.log("[STEP 4] Converting stack to array...");
    const arr = stack.toArray();
    console.log(`-> Result Array: [${arr.join(", ")}]`);

    // 5. Testing Iterator (LIFO order log)
    console.log("[STEP 5] Iterating through stack using for...of (LIFO order)...");
    let iterationLog = [];
    for (const item of stack) {
      iterationLog.push(item);
    }
    console.log(`-> Iteration Order: ${iterationLog.join(" -> ")} (Expected: 40 -> 30 -> 20 -> 10)\n`);

    // 6. Testing Pop Operations
    console.log("[STEP 6] Popping elements from the stack...");
    console.log(`-> Popped: ${stack.pop()} (Expected: 40)`);
    console.log(`-> Popped: ${stack.pop()} (Expected: 30)`);
    console.log(`-> New Top (Peek): ${stack.peek()} (Expected: 20)`);
    console.log(`-> New Size: ${stack.size()} (Expected: 2)\n`);

    // 7. Testing Clear Operation
    console.log("[STEP 7] Clearing the stack...");
    stack.clear();
    console.log(`-> Size after clear: ${stack.size()} (Expected: 0)`);
    console.log(`-> Is Empty: ${stack.isEmpty()} (Expected: true)\n`);

    // 8. Testing Error Handling
    console.log("[STEP 8] Testing error handling (Pop from empty stack)...");
    try {
      stack.pop();
    } catch (error) {
      console.log(`-> Caught Expected Error: "${error.message}"\n`);
    }

  } catch (globalError) {
    console.error("\n❌ Test failed unexpectedly:", globalError);
  }
}

// Run the logs
runStackTests();