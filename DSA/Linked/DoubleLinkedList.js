class Node {
 
    constructor(value, prev = null, next = null) {
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}

class DoubleLinkedList {
    #head = null;
    #tail = null;

    constructor(value) {
        if (value !== undefined) {
            let newNode = new Node(value);
            this.#head = newNode;
            this.#tail = newNode;
        }
    }

    get head() {
        return this.#head;
    }
    set head(head) {
        this.#head = head;
    }

    get tail() {
        return this.#tail;
    }

    set tail(tail) {
        this.#tail = tail;
    }

    empty() {
        return this.head === null;
    }

    size() {
        if (this.empty()) return 0;
        let cur = this.#head;
        let size = 0;
        while(cur) {
            ++size;
            cur = cur.next;
        }
        return size;
    }
    clear() {
        this.head = null;
        this.tail = null;
    }

    front() {
        if (this.empty()) throw new Error("List is empty");
        return this.head.value;
    }

    back() {
        if (this.empty()) throw new Error("List is empty");
        return this.tail.value;
    }

    at(index) {
        if (index < 0 || index >= this.size()) throw new Error("Index out of range");
        if (!Number.isInteger(index)) throw new Error("Index must be an integer"); 
        let length = this.size();
        if (index <= length / 2) {
            let cur = this.head;
            while (index > 0) {
                --index;
                cur = cur.next;
            }
            return cur.value;
        } 
        if (index > length / 2) {
            let cur = this.tail;
            let idx = length - 1 - index;
            while (idx > 0) {
                cur = cur.prev;
                --idx
            }
            return cur.value;
        }
    }

    pushFront(value) {
        if (!Number.isInteger(value)) throw new Error("Value must be an integer");
        if (this.empty()) {
            let newNode = new Node(value);
            this.head = newNode;
            this.tail = newNode;
            return;
        }
        let newNode = new Node(value);
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
    }

    pushBack(value) {
        if (this.empty()) {
            let newNode = new Node(value);
            this.head = newNode;
            this.tail = newNode;
            return;
        }
        let newNode = new Node(value);
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }

    popFront() {
        if (this.empty()) throw new Error("List is empty");
        if (this.size() === 1) {
            let deleteElement = this.head.value;
            this.head = null;
            this.tail = null;
            return deleteElement;
        }
        let deleteElement = this.head.value;
        this.head = this.head.next;
        this.head.prev = null;
        return deleteElement;
    }

    popBack() {
        if (this.empty()) throw new Error("List is empty");
        if (this.size() === 1) {
            let deleteElement = this.tail.value;
            this.head = null;
            this.tail = null;
            return deleteElement;
        }
        let deleteElement = this.tail.value;
        this.tail = this.tail.prev;
        this.tail.next = null;
        return deleteElement;
    }

    insert(index, value) {
        if (index < 0 || index > this.size()) throw new Error("Index out of range");
        if (!Number.isInteger(index)) throw new Error("Index must be an integer");
        if (index === 0) {
            this.pushFront(value);
            return;
        }
        if (index === this.size()) {
            this.pushBack(value);
            return;
        }
        let cur = this.head;
        while (index !== 0) {
            cur = cur.next;
            --index;
        }
        let newNode = new Node(value);
        newNode.next = cur;
        newNode.prev = cur.prev;
        cur.prev.next = newNode;
        cur.prev = newNode;
    }

    erase(index) {
        if (!Number.isInteger(index)) throw new Error("Index must be an integer");
        if (index < 0 || index >= this.size()) throw new Error("Index out of range");
        if (index === 0) return this.popFront();
        if (index === this.size() - 1) return this.popBack();
        let cur = this.head;
        while (index !== 0) {
            cur = cur.next;
            --index;
        }
        let deleteElement = cur.value;
        cur.prev.next = cur.next;
        cur.next.prev = cur.prev;
        return deleteElement;
    }

    find(value) {
        if (!Number.isInteger(value)) throw new Error("Value must be an integer");
        if (this.empty()) return -1;
        let cur = this.head;
        let index = 0;
        while (cur) {
            if (cur.value === value) return index;
            cur = cur.next;
            ++index;
        }
        return -1;
    }

    contains(value) {
        if (this.empty()) return false;
        if (this.size() === 1 && this.head.value === value) return true; 
        let cur = this.head;

        while (cur) {
            if (cur.value === value) return true;
            cur = cur.next;
        }
        return false;
    }

    toArray() {
        if (this.empty()) return [];
        let arr = new Array();
        let cur = this.head;
        while(cur) {
            arr.push(cur.value);
            cur = cur.next;
        }
        return arr;
    }

    reverse() {
        if (!this.head) return [];
        let cur = this.head;
        let tmp = this.head;
        let prevNode = null;
        while (cur) {
            tmp = tmp.next;
            cur.next = prevNode;
            cur.prev = tmp;
            prevNode = cur;
            cur = tmp;
        }
        this.tail = this.head;
        this.head = prevNode;
    }

        [Symbol.iterator]() {
            let current = this.head;
            return {
                next: () => {
                    if (!current) {
                        return {value: undefined, done: true};
                    }
                    let value = current.value;
                    current = current.next;
                    return {value: value, done: false};
                } 
            }
        }
        
        *reverseIterator() {
            let cur = this.tail;
            while (cur) {
                yield cur.value;
                cur = cur.prev;
            }
           
        }

        *entries() {
            let current = this.head;
            let index = 0;
            while(current) {
                yield [index++, current.value];
                current = current.next;
           }
        }
}

const list = new DoubleLinkedList();

console.log(list.empty());  
console.log(list.size());      
console.log(list.toArray());    

list.pushBack(10);
list.pushBack(20);
list.pushBack(30);

console.log(list.toArray());  
console.log(list.front());    
console.log(list.back());    
console.log(list.size());    

list.pushFront(5);

console.log(list.toArray());    
console.log(list.front());     
console.log(list.back());     

console.log(list.at(0));        
console.log(list.at(1));    
console.log(list.at(2));  
console.log(list.at(3));       

list.insert(2, 15);

console.log(list.toArray()); 

for (let val of list.reverseIterator()) {
    console.log(val);
}

