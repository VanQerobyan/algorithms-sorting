class BucketedDeque {
    #everyBucketsLength;
    #bucketSize;
    #buckets;
    #frontBucket;
    #backBucket;
    #frontIndex;
    #backIndex;
    #size;


    constructor(everyBucketLength = 8) {
        if (!Number.isInteger(everyBucketLength)) throw new Error("Bucket length must be an integer");
        if (everyBucketLength <= 0) throw new Error("Bucket length must be greather than 0");
        this.#everyBucketsLength = everyBucketLength;
        this.#bucketSize = 4;
        this.#init();
    }

    #init() {
        this.#buckets = new Array(this.#bucketSize);
        for (let i = 0; i < this.#bucketSize; ++i) {
            this.#buckets[i] = new Array(this.#everyBucketsLength);
        }
    
        let mid = Math.floor(this.#bucketSize/2);
        this.#frontBucket = mid - 1;
        this.#backBucket = mid;
        this.#frontIndex = this.#everyBucketsLength - 1;
        this.#backIndex = 0;
        this.#size = 0;
    }

    push_front(value) {
        if (!Number.isInteger(value)) throw new Error("Value must be an integer"); 
        if (this.#frontBucket === 0 && this.#frontIndex === -1) {
            this.#ensureBucket();
        }
        if (this.#frontIndex === -1) {
            this.#frontBucket = this.#frontBucket - 1;
            this.#frontIndex = this.#everyBucketsLength - 1;
        }
        this.#buckets[this.#frontBucket][this.#frontIndex] = value;
        this.#frontIndex--;
        this.#size++;
    }

    push_back(value) {
        if (!Number.isInteger(value)) throw new Error("Value must be an integer");
        if (this.#backBucket === this.#buckets.length - 1 && this.#backIndex === this.#everyBucketsLength) {
            this.#ensureBucket();
        }
        if (this.#backIndex === this.#everyBucketsLength) {
            this.#backBucket = this.#backBucket + 1;
            this.#backIndex = 0;
        }
        this.#buckets[this.#backBucket][this.#backIndex] = value;
        this.#backIndex++;
        this.#size++;
    } 

    pop_front() {
        if (this.isEmpty()) throw new RangeError("Deque is empty");
        let popElement = null;
        if (this.#buckets[this.#frontBucket][this.#frontIndex + 1] !== undefined) {
            popElement = this.#buckets[this.#frontBucket][this.#frontIndex + 1];
            this.#frontIndex++;
            this.#size--;
            return popElement;
        }
        if (this.#frontIndex === this.#everyBucketsLength - 1) {
            this.#frontBucket = this.#frontBucket + 1;
            this.#frontIndex = 0;
            popElement = this.#buckets[this.#frontBucket][this.#frontIndex];
            this.#size--;
            return popElement;
        }
    }

    pop_back() {
        if (this.isEmpty()) throw new RangeError("Deque is empty");
        let popElement = null;
        if (this.#buckets[this.#backBucket][this.#backIndex - 1] !== undefined) {
            popElement = this.#buckets[this.#backBucket][this.#backIndex - 1];
            this.#backIndex--;
            this.#size--;
            return popElement;
        }
        if (this.#backIndex === 0) {
            this.#backBucket = this.#backBucket - 1;
            this.#backIndex = this.#everyBucketsLength - 1;
            popElement = this.#buckets[this.#backBucket][this.#backIndex];
            this.#size--;
            return popElement;
        }
    }

    front() {
        if (this.#size === 0) return undefined;
        if (this.#buckets[this.#frontBucket][this.#frontIndex + 1] !== undefined) {
            return this.#buckets[this.#frontBucket][this.#frontIndex + 1];
        } else {
            return this.#buckets[this.#frontBucket + 1][0];
        }
    }

    back() {
        if (this.#size === 0) return undefined;
        if (this.#buckets[this.#backBucket][this.#backIndex - 1] !== undefined) {
            return this.#buckets[this.#backBucket][this.#backIndex - 1];
        } else {
            return this.#buckets[this.#backBucket - 1][this.#everyBucketsLength - 1];
        }
    }

    clear() {
        this.#init();
    }

    size() {
        return this.#size;
    }

    isEmpty() {
        return this.#size === 0;
    }

    toArray() {
        let newArray = [];

        for (let i = 0; i < this.#size; ++i) {
            newArray.push(this.at(i));
        }
        return newArray;
    }

    at(globalIndex) {
        if (globalIndex >= this.#size || globalIndex < 0) return undefined;
        if (!Number.isInteger(globalIndex)) throw new Error("Index must be an integer");
        let [localIdx, backIdx] = this.#bucketIndex(globalIndex);
        return this.#buckets[backIdx][localIdx];
    }

    #bucketIndex(globalIndex) {
       if (globalIndex < 0 && globalIndex >= this.#size) return undefined;
        if (!Number.isInteger(globalIndex)) throw new Error("Index muts be an integer");
        const absoluteIndex = globalIndex + this.#frontIndex + 1;
        const localIdx = absoluteIndex % this.#everyBucketsLength;
        const bucketIdx = this.#frontBucket + Math.floor(absoluteIndex / this.#everyBucketsLength);
        return [localIdx, bucketIdx];
    }

    *[Symbol.iterator]() {
        let idx = 0;
        while (idx < this.#size) {
            yield this.at(idx);
            idx++;
        }
    }
     #ensureBucket() {
        let newBucketSize = this.#bucketSize * 2;
        let newBucket = new Array(newBucketSize);

        let i = 0; 
        let j = newBucketSize - 1;
        while (i < this.#bucketSize/2) {
            newBucket[i] = new Array(this.#everyBucketsLength);
            newBucket[j] = new Array(this.#everyBucketsLength);
            ++i;
            --j;
        }
        j = 0;
        while (j < this.#buckets.length) {
            newBucket[i++] = this.#buckets[j++];
        }
        this.#frontBucket = (this.#bucketSize/2) + this.#frontBucket;
        this.#backBucket = this.#bucketSize/2 + this.#backBucket;
        this.#bucketSize = newBucketSize;
        this.#buckets = newBucket;
    }
}

   
function runTests() {
    console.log("🚀 Starting BucketedDeque Test Suite...\n");

    try {
        // 1. Initialization Test
        console.log("--- Test 1: Initialization ---");
        const deque = new BucketedDeque(4); // bucket length of 4
        console.log("✅ Initial size (expected 0):", deque.size());
        console.log("✅ Is empty (expected true):", deque.isEmpty());

        // 2. push_back and back Methods Test
        console.log("\n--- Test 2: push_back and back ---");
        deque.push_back(10);
        deque.push_back(20);
        deque.push_back(30);
        console.log("✅ Back element (expected 30):", deque.back());
        console.log("✅ Front element (expected 10):", deque.front());
        console.log("✅ Current size (expected 3):", deque.size());

        // 3. push_front and front Methods Test
        console.log("\n--- Test 3: push_front and front ---");
        deque.push_front(5);
        deque.push_front(1);
        console.log("✅ Front element (expected 1):", deque.front());
        console.log("✅ Back element (expected 30):", deque.back());
        console.log("✅ Current size (expected 5):", deque.size());

        // 4. Indexing (at) and Mass Access Test
        console.log("\n--- Test 4: Indexing (at) ---");
        // Expected sequence: [1, 5, 10, 20, 30]
        console.log("✅ Index 0 (expected 1):", deque.at(0));
        console.log("✅ Index 2 (expected 10):", deque.at(2));
        console.log("✅ Index 4 (expected 30):", deque.at(4));
        console.log("✅ Out of bounds index (expected undefined):", deque.at(100));

        // 5. Array Conversion (toArray) and Iterator (Symbol.iterator) Test
        console.log("\n--- Test 5: toArray and Iterator ---");
        console.log("✅ toArray result:", deque.toArray()); // [1, 5, 10, 20, 30]
        
        const elementsFromIterator = [];
        for (const val of deque) {
            elementsFromIterator.push(val);
        }
        console.log("✅ Iterator (for...of) result:", elementsFromIterator);

        // 6. Buffer Expansion Test (Triggers #ensureBucket)
        console.log("\n--- Test 6: Buffer Expansion (Resize/EnsureBucket) ---");
        console.log("Adding multiple elements to push capacity limits...");
        for (let i = 100; i <= 110; i++) deque.push_back(i);
        for (let i = 50; i >= 40; i--) deque.push_front(i);
        console.log("✅ Size after expansion:", deque.size());
        console.log("✅ Full array after expansion:\n", deque.toArray());

        // 7. pop_front and pop_back Methods Test
        console.log("\n--- Test 7: Pop Methods ---");
        const initialSize = deque.size();
        const poppedFront = deque.pop_front();
        const poppedBack = deque.pop_back();
        console.log(`✅ Popped from front (expected 40): ${poppedFront}`);
        console.log(`✅ Popped from back (expected 110): ${poppedBack}`);
        console.log(`✅ New size (expected ${initialSize - 2}):`, deque.size());

        // 8. Clear Method Test
        console.log("\n--- Test 8: Clearing the Deque ---");
        deque.clear();
        console.log("✅ Size after clear (expected 0):", deque.size());
        console.log("✅ Is empty (expected true):", deque.isEmpty());

        // 9. Error Handling Test
        console.log("\n--- Test 9: Error Handling ---");
        
        try {
            deque.pop_front(); // Should throw RangeError since it's empty
            console.log("❌ Failed: pop_front on empty deque should throw an error.");
        } catch (e) {
            console.log("✅ Passed: Popping from empty deque threw:", e.message);
        }

        try {
            deque.push_back("not an integer"); // Should throw Error
            console.log("❌ Failed: Pushing a non-integer should throw an error.");
        } catch (e) {
            console.log("✅ Passed: Pushing a non-integer threw:", e.message);
        }

    } catch (error) {
        console.error("\n❌ Test Suite Failed! Bug detected in implementation:", error);
    }
}

// Execute the test suite
runTests();