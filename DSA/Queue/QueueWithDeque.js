import BucketedDeque from "./Deque.js";
class QueueWithDeque {
  #data;
  #capacity;

  constructor() {
    this.#capacity = 8;
    this.#data = new BucketedDeque(this.#capacity);
  }

  enqueue(value) {
    this.#data.push_front(value);
  }

  dequeue() {
    if (this.isEmpty()) throw new Error("Queue is empty");
    return this.#data.pop_back();
  }

  front() {
    return this.#data.back();
  }

  back() {
    return this.#data.front();
  }

  size() {
    return this.#data.size();
  }

  isEmpty() {
    return this.#data.isEmpty();
  }

  clear() {
    return this.#data.clear();
  }

  toArray() {
    return this.#data.toArray().slice().reverse();
  }

  *[Symbol.iterator]() {
    let idx = this.#data.size();
    while (idx--) {
      yield this.#data.at(idx);
    }
  }
}

function runQueueTests() {
    console.log("🚀 Starting Queue Test Suite...\n");

    try {
        const queue = new Queue();

        // 1. Initialization Test
        console.log("--- Test 1: Initialization ---");
        console.log("Size (Expected: 0) -> Actual:", queue.size());
        console.log("Is Empty (Expected: true) -> Actual:", queue.isEmpty());
        console.log("Front (Expected: undefined) -> Actual:", queue.front());
        console.log("Back (Expected: undefined) -> Actual:", queue.back());

        // 2. Enqueue Operations
        console.log("\n--- Test 2: Enqueue Operations ---");
        console.log("Enqueuing: 10, 20, 30...");
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        
        console.log("Size (Expected: 3) -> Actual:", queue.size());
        console.log("Is Empty (Expected: false) -> Actual:", queue.isEmpty());
        console.log("Front Element (Expected: 10) -> Actual:", queue.front());
        console.log("Back Element (Expected: 30) -> Actual:", queue.back());

        // 3. FIFO Order Validation (toArray & Iterator)
        console.log("\n--- Test 3: FIFO Order Validation ---");
        console.log("toArray() (Expected: [10, 20, 30]) -> Actual:", queue.toArray());
        
        const iteratorElements = [];
        for (const element of queue) {
            iteratorElements.push(element);
        }
        console.log("Iterator [for...of] (Expected: [10, 20, 30]) -> Actual:", iteratorElements);

        // 4. Dequeue Operations (FIFO Order)
        console.log("\n--- Test 4: Dequeue Operations ---");
        console.log("Dequeued (Expected: 10) -> Actual:", queue.dequeue());
        console.log("New Front (Expected: 20) -> Actual:", queue.front());
        console.log("Size (Expected: 2) -> Actual:", queue.size());
        
        console.log("Dequeued (Expected: 20) -> Actual:", queue.dequeue());
        console.log("Dequeued (Expected: 30) -> Actual:", queue.dequeue());
        console.log("Size after draining (Expected: 0) -> Actual:", queue.size());

        // 5. Clear & Post-Clear Lifecycle
        console.log("\n--- Test 5: Clear & Reusability ---");
        queue.enqueue(100);
        queue.enqueue(200);
        console.log("Size before clear (Expected: 2) -> Actual:", queue.size());
        
        queue.clear();
        console.log("Size after clear (Expected: 0) -> Actual:", queue.size());
        console.log("Is Empty (Expected: true) -> Actual:", queue.isEmpty());

        // 6. Error Handling
        console.log("\n--- Test 6: Error Handling ---");
        try {
            queue.dequeue();
            console.log("❌ Failure: Dequeuing from empty queue did not throw an error.");
        } catch (error) {
            console.log("✅ Success: Correctly caught error ->", error.message);
        }

        // 7. Stress / Resizing Test (Triggers BucketedDeque expansion)
        console.log("\n--- Test 7: Bulk Data & Resizing Test ---");
        console.log("Enqueuing 50 elements to trigger internal bucket expansion...");
        for (let i = 1; i <= 50; i++) {
            queue.enqueue(i);
        }
        console.log("Size (Expected: 50) -> Actual:", queue.size());
        console.log("Front (Expected: 1) -> Actual:", queue.front());
        console.log("Back (Expected: 50) -> Actual:", queue.back());

        // Drain and check if order is intact
        let isOrderCorrect = true;
        for (let i = 1; i <= 50; i++) {
            if (queue.dequeue() !== i) {
                isOrderCorrect = false;
                break;
            }
        }
        console.log("Drained 50 elements in correct FIFO order? (Expected: true) -> Actual:", isOrderCorrect);
        console.log("Final Size (Expected: 0) -> Actual:", queue.size());

        console.log("\n🎉 ALL TESTS EXECUTED! Verify outputs above to ensure correctness.");

    } catch (criticalError) {
        console.error("\n💥 Critical Test Failure:", criticalError);
    }
}

// Run the test suite
runQueueTests();