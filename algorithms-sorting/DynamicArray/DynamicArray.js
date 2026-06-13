class DynamicArray {
    #arr = null;
    #size = 0;
    #capacity = 0;
    CAP_EXPONENT = 2;

    constructor(capacity = 8) {
        if (capacity <= 0) throw new TypeError("Capacity must be an positive"); 
        if (!Number.isInteger(capacity)) throw TypeError("Capacity must be an integer");
        this.#capacity = capacity;
        this.#arr = new Uint32Array(this.#capacity);
    }

    resize(newCapacity, fill = 0) {
        if (newCapacity <= 0) throw new Error("Capacity must be an positive");
        if (!Number.isInteger(newCapacity)) throw new Error("Capacity must be an integer");
        if (newCapacity < this.#size) this.#size = newCapacity;
            let newArr = new Uint32Array(newCapacity);
            for (let i = 0; i < this.#size; ++i) {
                newArr[i] = this.#arr[i];
            }
            this.#capacity = newCapacity;
            this.#arr = newArr;
    }
    pushBack(elem) {
        if (!Number.isInteger(elem)) throw new Error("Element must be an integer");
        if (this.#size === this.#capacity) {
            this.#capacity *= this.CAP_EXPONENT;
             this.resize(this.#capacity);
        }
        this.#arr[this.#size] = elem;
        this.#size++;
    }
    popBack() {
        if (this.empty()) throw new Error("Array is empty");
        let removeElem = this.#arr[this.#size - 1];
        this.#size--;
        return removeElem;
        }
    erase(index) {
        if (index < 0 || index >= this.#size) throw new Error("Index out of range");
            for (let i = index; i < this.#size - 1; ++i) {
                this.#arr[i] = this.#arr[i + 1];
            }
            this.#size--;
    }
    size() {
        return this.#size;
    }
    at(index) {
        if (!Number.isInteger(index)) throw new Error("Index must be an integer");
        if (index < 0 || index >= this.#size) throw new Error("Index out of range");
        return this.#arr[index];
    }
    empty() {
        if (this.#size === 0) return true;
        return false;
    }
    clear() {
        this.#size = 0;
    }
    setValue(i, value) {
        if (!Number.isInteger(i)) throw new Error("i must be an integer");
        if (!Number.isInteger(value)) throw new Error("value must be an integer");
        if (i < 0 || i >= this.#size) throw new Error("i out of range");
        this.#arr[i] = value;
    }
    front() {
        if (this.empty()) throw new Error("Array is empty");
        return this.#arr[0];
    }
    back() {
        if (this.empty()) throw new Error("Array is empty");
        return this.#arr[this.#size - 1];
    }
    capacity() {
        return this.#capacity;
    }
    [Symbol.iterator]() {
        let startIndex = 0;
        return {
            next: () => {
                if (startIndex < this.#size) {
                    return {value: this.#arr[startIndex++], done: false};
                }
                return {value: undefined, done: true};
            }
        }
        }
    reserve(n) {
        if (n <= 0) throw new Error("n must be an positive");
        if (!Number.isInteger(n)) throw new Error("n must be an integer");
        if (n > this.#capacity) {
            this.resize(n);
        }
    }
    shrinkToFit() {
        if (this.#size === 0) throw new Error("size is 0");
        this.resize(this.#size);
    }
    toArray() { 
       let newArr = new Array(this.#size);
       for (let i = 0; i < this.#size; ++i) {
            newArr[i] = this.#arr[i];
       }
       return newArr;
    }
    insert(pos, value) {
        if (pos < 0 || pos > this.#size) throw new Error("pos out of range");
        if (!Number.isInteger(pos)) throw new Error("pos must be an integer");
        if (!Number.isInteger(value)) throw new Error("value must be an integer");
        if (this.#size + 1 > this.#capacity) {
           this.#capacity *= this.CAP_EXPONENT;
             this.resize(this.#capacity); 
        }
        for (let i = this.#size - 1; i >= pos; --i) {
            this.#arr[i + 1] = this.#arr[i];
        }
        this.#arr[pos] = value;
        this.#size++;
    }
    swap(i, j) {
        if (!Number.isInteger(i) || !Number.isInteger(j)) throw new Error("i or j not integer");
        if (i < 0 || i >= this.#size || j < 0 || j >= this.#size) throw new Error("i or j out of range");
        [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
    }
    values() {
        let startIndex = 0;
        return {    
            next: () => {
                if (startIndex < this.#size) {
                    return {value: this.#arr[startIndex++], done: false};
                }
                return {value: undefined, done: true};
            }
        }
    }
    keys() {
        let startKey = 0;
        return {
            next: () => {
                if (startKey < this.#size) {
                       return {value: startKey++, done: false};
                }
                return {value: undefined, done: true};
            }
        }
    }
    entries() {
        let startValue = 0;
        let startKey = 0;
        return {
            next: () => {
                if (startKey < this.#size) {
                     return {value: [startKey++, this.#arr[startValue++]], done: false};
                }
                return {value: undefined, done: true};
            }
        }
    }
    forEach(callback, thisArg) {
        if (typeof callback  !== "function") throw new Error(callback + " is not a function");
        for (let i = 0; i < this.#size; ++i) {
            callback.call(thisArg, this.#arr[i], i, this.#arr);
        }
    }
    map(callback, thisArg) {
        if (typeof callback !== "function") throw new Error(callback + " is not a function");
        let newArr = new DynamicArray(this.#capacity);
        for (let i = 0; i < this.#size; ++i) {
             newArr.pushBack(callback.call(thisArg, this.#arr[i], i, this.#arr));
        }
        return newArr;
    }
    filter(callback, thisArg) {
        if (typeof callback !== "function") throw new Error(callback + " is not a function");
        let newArr = new DynamicArray(this.#capacity);
        for (let i = 0; i < this.#size; ++i) {
            if (callback.call(thisArg, this.#arr[i], i, this.#arr)) {
                newArr.pushBack(this.#arr[i]);
            }
        }
        return  newArr;
    }
    reduce(callback, initialValue = 0) {
        if (typeof callback !== "function") throw new Error(callback + " is not a function");
        if (!Number.isInteger(initialValue)) throw new Error("Initial value must be an integer");
        let acc = initialValue;
        for (let i = 0; i < this.#size; ++i) {
            acc = callback(acc, this.#arr[i], i, this.#arr);
        }
        return acc;
     }
    some(callback, thisArg) {
        if (typeof callback !== "function") throw new Error(callback + " is not a function");
        for (let i = 0; i < this.#size; ++i) {
            if (callback.call(thisArg, this.#arr[i], i, this.#arr)) return true;
        }
        return false;
    }
    every(callback, thisArg) {
         if (typeof callback !== "function") throw new Error(callback + " is not a function");
         for (let i = 0; i < this.#size; ++i) {
            if (!callback.call(thisArg, this.#arr[i], i, this.#arr)) return false;
         }
         return true;
    }
    find(callback, thisArg) {
         if (typeof callback !== "function") throw new Error(callback + " is not a function");
         for (let i = 0; i < this.#size; ++i) {
            if (callback.call(thisArg, this.#arr[i], i, this.#arr)) return this.#arr[i];
         }
         return undefined;
    }
    findIndex(callback, thisArg){
        if (typeof callback !== "function") throw new Error(callback + " is not a function");
        for (let i = 0; i < this.#size; ++i) {
        if (callback.call(thisArg, this.#arr[i], i, this.#arr)) return i;
    }
    return -1;
    }
    includes(value) {
        if (!Number.isInteger(value)) throw new Error("Value must be an integer");
        for (let i = 0; i < this.#size; ++i) {
            if (this.#arr[i] === value) return true;
        }
        return false;
    }
}



const arr = new DynamicArray(4);


console.log(arr.size());       
console.log(arr.capacity());   
console.log(arr.empty());      


arr.pushBack(10);
arr.pushBack(20);
arr.pushBack(30);
arr.pushBack(40);

console.log(arr.toArray());    
console.log("Size " + arr.size());       
console.log("Capacity " + arr.capacity());   

arr.pushBack(50);

console.log(arr.toArray());    
console.log("Size: " + arr.size());       
console.log("Capacity: "+ arr.capacity());   

console.log("Pop "+ arr.popBack());

console.log("Front " + arr.front());      
console.log("Back " + arr.back());       

console.log(arr.toArray());    


console.log("At 0 index " + arr.at(0));        
console.log("At 2 index " + arr.at(2));        
console.log("At 3 index " + arr.at(3));        

arr.insert(0, 5);
arr.insert(3, 25);

console.log(arr.toArray());    
