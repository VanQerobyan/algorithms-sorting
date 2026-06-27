class CircularQueue {
 #data;
 #front;
 #size;
 #capacity;
 #back;
 constructor(capacity = 8) {
    if (!Number.isInteger(capacity) || capacity <= 0) throw new Error("Capacity must be an integer");
    this.#capacity = capacity;
    this.#data = new Array(capacity);
    this.#front = 0;
    this.#size = 0;
    this.#back = 0;
 }

 size() {
    return this.#size;
 }

 capacity() {
    return this.#capacity;
 }

 isEmpty() {
    return this.#size === 0;
 }

 clear() {
    this.#data = new Array(this.#capacity);
    this.#front = 0;
    this.#size = 0;
    this.#back = 0;
 }

 enqueue(value) {
    if (this.#size === this.#capacity) {
        this.#grow();
    }
    let rear = this.#back % this.#capacity;
    this.#data[rear] = value;
    this.#back = rear + 1;
    this.#size++;
 }

 dequeue() {
    if (this.isEmpty()) throw new Error("Queue is empty");
    let rear = this.#front % this.#capacity;
    this.#front = (this.#front + 1) % this.#capacity;
    this.#size--;
    return this.#data[rear];
 }

 front() {
    if (this.isEmpty()) throw new Error("Queue is empty");
    return this.#data[this.#front];
 }

 back() {
    if (this.isEmpty()) throw new Error("Queue is empty");
    return this.#data[this.#back - 1];
 }

 #grow() {
    let newCapacity = this.#capacity * 2;
    let newData = new Array(newCapacity);
    for (let i = 0; i < this.#size; ++i) {
        let idx = (this.#front + i) % this.#capacity;
        newData[i] = this.#data[idx];
    }
    this.#front = 0;
    this.#back = this.#capacity;
    this.#capacity = newCapacity;
    this.#data = newData;
 }

 toArray() {
     let arr = [];
    for (let i = 0; i < this.#size; ++i) {
        let elem = (this.#front + i) % this.#capacity;
        arr.push(this.#data[elem]);
    }
    return arr;
 }

 toString() {
    let str = "";
    for (let i = 0; i < this.#size; ++i) {
        let elem = (this.#front + i) % this.#capacity;
        if (i !== this.#size - 1) {
            str += elem + ",";
        } else {
            str += elem;
        }
    }
    return str;
 }

 *[Symbol.iterator]() {
     let idx = 0;
     let elem = 0;
     while (idx < this.#size) {
        elem = (this.#front + idx) % this.#capacity;
        yield this.#data[elem];
        idx++;
     }
 }
}


function runTestSuite() {
    console.log("🚀 Starting CircularQueue Test...");

    const q = new CircularQueue(3);
    console.log(`[Init] Size: ${q.size()} | Capacity: ${q.capacity()}`);

    // 1. Core Operations
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    console.log(`[Filled] Elements: [${q.toArray().join(', ')}] | Front: ${q.front()} | Back: ${q.back()}`);

    // 2. Circular Wrap-around
    console.log(`[Dequeue] ${q.dequeue()}`);
    console.log(`[Dequeue] ${q.dequeue()}`);
    q.enqueue(40);
    q.enqueue(50);
    console.log(`[Wrapped] Elements: [${q.toArray().join(', ')}] | Front: ${q.front()} | Back: ${q.back()}`);

    // 3. Automatic Resize
    q.enqueue(60); 
    console.log(`[Resized] Capacity: ${q.capacity()} | Size: ${q.size()}`);
    console.log(`[Resized] Elements: [${q.toArray().join(', ')}]`);

    // 4. Iterator
    const iterated = [];
    for (const item of q) {
        iterated.push(item);
    }
    console.log(`[Iterator] Elements: [${iterated.join(', ')}]`);

    // 5. Clear
    q.clear();
    console.log(`[Clear] Size: ${q.size()} | Capacity: ${q.capacity()}`);
}

runTestSuite();