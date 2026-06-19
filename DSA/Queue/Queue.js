class Queue {
    #arr;
    #capacity;
    #size;
    #back;
    #front;

    constructor(capacity = 8) {
        if (!Number.isInteger(capacity)) throw new Error("Capacity must be an integer");
        if (capacity <= 0) throw new Error("Capacity must be greather than 0");
        this.#capacity = capacity;
        this.#arr = new Array(this.#capacity);
        this.#size = 0;
        this.#back = 0;
        this.#front = 0;
    }
    size() {
        return this.#size;
    }
    isEmpty() {
        return this.#size === 0;
    }
    clear() {
       this.#arr = new Array(this.#capacity);
       this.#size = 0;
       this.#back = 0;
       this.#front = 0;
    }
    enqueue(value) {
        if (this.#back === this.#capacity) this.#ensureCapacity();
        this.#arr[this.#back] = value;
        this.#back++;
        this.#size++;
    }
    dequeue() {
        if (this.isEmpty()) throw new Error("Queue is empty");
        let elem = this.#arr[this.#front];
        this.#front++;
        this.#size--;
        if (this.#size === 0) {    
            this.#front = 0;
            this.#back = 0;
        };
        return elem;
    }
    front() {
        if (this.isEmpty())  return undefined;
        return this.#arr[this.#front];
    }
    back() {
        if (this.isEmpty()) return undefined;
        return this.#arr[this.#back - 1];
    }
    toArray() {
        let newArr = [];
        for (let i = this.#front; i < this.#back; ++i) {
            newArr.push(this.#arr[i]);
        }
        return newArr;
    }

    *[Symbol.iterator]() {
        let idx = this.#front;
        while (idx < this.#back) {
            yield this.#arr[idx];
            idx++;
        }
    }
    #ensureCapacity() {
        let newCapacity = this.#capacity * 2;
        let newArr = new Array(newCapacity);
        let j = 0;
        for (let i = this.#front; i < this.#back; ++i) {
            newArr[j] = this.#arr[i];
            ++j;
        }
        this.#capacity = newCapacity;
        this.#back = j;
        this.#front = 0;
        this.#arr = newArr;
    } 
}

function runArrayQueueTests() {
    console.log("🚀 Starting Array-Based Queue Test Suite...\n");

    try {
        // We initialize with a small capacity of 3 to easily test resizing
        const queue = new Queue(3);

        // 1. Initialization Test
        console.log("--- Test 1: Initialization ---");
        console.log("Size (Expected: 0) -> Actual:", queue.size());
        console.log("Is Empty (Expected: true) -> Actual:", queue.isEmpty());
        console.log("Front (Expected: undefined) -> Actual:", queue.front());
        console.log("Back (Expected: undefined) -> Actual:", queue.back());

        // 2. Enqueue Operations up to Initial Capacity
        console.log("\n--- Test 2: Enqueue Operations ---");
        console.log("Enqueuing: 10, 20, 30...");
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        
        console.log("Size (Expected: 3) -> Actual:", queue.size());
        console.log("Front Element (Expected: 10) -> Actual:", queue.front());
        console.log("Back Element (Expected: 30) -> Actual:", queue.back());
        console.log("toArray() (Expected: [10, 20, 30]) -> Actual:", queue.toArray());

        // 3. Capacity Expansion Test (Triggers #ensureCapacity)
        console.log("\n--- Test 3: Capacity Expansion (#ensureCapacity) ---");
        console.log("Enqueuing 40 (This should trigger resize since capacity was 3)...");
        queue.enqueue(40);
        
        console.log("Size (Expected: 4) -> Actual:", queue.size());
        console.log("Front Element (Expected: 10) -> Actual:", queue.front());
        console.log("Back Element (Expected: 40) -> Actual:", queue.back());
        console.log("toArray() (Expected: [10, 20, 30, 40]) -> Actual:", queue.toArray());

        // 4. Dequeue & Index Shifting Mechanics
        console.log("\n--- Test 4: Dequeue & Index Shifting ---");
        console.log("Dequeued (Expected: 10) -> Actual:", queue.dequeue());
        console.log("Dequeued (Expected: 20) -> Actual:", queue.dequeue());
        
        console.log("New Front (Expected: 30) -> Actual:", queue.front());
        console.log("Back Element (Expected: 40) -> Actual:", queue.back());
        console.log("Size (Expected: 2) -> Actual:", queue.size());
        console.log("toArray() (Expected: [30, 40]) -> Actual:", queue.toArray());

        // 5. Iterator Test (Symbol.iterator)
        console.log("\n--- Test 5: Iterator Validation [for...of] ---");
        const iteratorElements = [];
        for (const element of queue) {
            iteratorElements.push(element);
        }
        console.log("Iterator Result (Expected: [30, 40]) -> Actual:", iteratorElements);

        // 6. Complete Drain and Reset Verification
        console.log("\n--- Test 6: Complete Drain & Pointer Reset ---");
        console.log("Dequeued (Expected: 30) -> Actual:", queue.dequeue());
        console.log("Dequeued (Expected: 40) -> Actual:", queue.dequeue());
        
        console.log("Size after draining (Expected: 0) -> Actual:", queue.size());
        console.log("Is Empty (Expected: true) -> Actual:", queue.isEmpty());
        
        // Pointers should reset to 0 internally now. Let's verify by adding a new item.
        console.log("Enqueuing 50 into empty queue...");
        queue.enqueue(50);
        console.log("Front (Expected: 50) -> Actual:", queue.front());
        console.log("Back (Expected: 50) -> Actual:", queue.back());

        // 7. Clear Method
        console.log("\n--- Test 7: Clear Method ---");
        queue.enqueue(60);
        console.log("Size before clear (Expected: 2) -> Actual:", queue.size());
        queue.clear();

       
        console.log("Size after clear (Expected: 0) -> Actual:", queue.size());
        console.log("Is Empty (Expected: true) -> Actual:", queue.isEmpty());

        // 8. Error Handling (Edge Case)
        console.log("\n--- Test 8: Error Handling ---");
        try {
            queue.dequeue();
            console.log("❌ Failure: Dequeuing from an empty queue did not throw an error.");
        } catch (error) {
            console.log("✅ Success: Correctly caught error ->", error.message);
        }

    } catch (criticalError) {
        console.error("\n💥 Critical Test Failure:", criticalError);
    }
}

// Execute the tests
runArrayQueueTests();