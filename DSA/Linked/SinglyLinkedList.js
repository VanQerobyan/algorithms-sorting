class Node {
    #value;
    #next;
    constructor(value, next = null) {
        this.#value = value;
        this.#next = next;
    }
    set value(value) {
        this.#value = value;
    }
    get value() {
        return this.#value;
    }
    set next(next) {
        this.#next = next;
    }
    get next() {
        return this.#next;
    }
}

class SinglyLinkedList {
    #head;
    constructor(value) {
        if (value) {
            let newNode = new Node(value);
            this.#head = newNode;
            return;
        }
        this.#head = null;
    }
    isEmpty() {
        return this.#head === null; 
    }
    size() {
        if (this.isEmpty()) return 0;
        let current = this.#head;
        let size = 0;
        while (current) {
            ++size;
            current = current.next;
        }
        return size;
    }
    clear() {
        this.#head = null;
    }
    front() {
        if (this.isEmpty()) throw new Error("List is empty");
        return this.#head.value;
    }
    back() {
        if (this.isEmpty()) throw new Error("List is empty");
        let current = this.#head;
        while (current.next) {
            current = current.next;
        }
        return current.value;
    }
    at(index) {
        if (!Number.isInteger(index)) throw new Error("Index is not an integer");
        if (index < 0 || index >= this.size()) throw new Error("Index out of range");
        let current = this.#head;
        while (index > 0) {
            current = current.next;
            --index;
        }
        return current.value;
    }
    pushFront(value) {
        if (this.isEmpty()) {
            let newNode = new Node(value);
            this.#head = newNode;
            return;
        }
        let newNode = new Node(value);
        newNode.next = this.#head;
        this.#head = newNode;
    }

    pushBack(value) {
        if (this.isEmpty()) {
            let newNode = new Node(value);
            this.#head = newNode;
            return;
        }
        let newNode = new Node(value);
        let current = this.#head;
        while(current.next) {
            current = current.next;
        }
        current.next = newNode;
    }
    popFront() {
        if (this.isEmpty()) throw new Error("List is empty");
        let deleteElement = this.#head.value;
        this.#head = this.#head.next;
        return deleteElement;
    }

    popBack() {
        if (this.isEmpty()) throw new Error("List is empty");
        if (this.size() === 1) {
            let deleteElement = this.#head.value;
            this.#head = null;
            return deleteElement;
        }
        let current = this.#head;

        while(current.next.next) {   
            current = current.next;
        }
        let deleteElement = current.next.value;
        current.next = null;
        return deleteElement;
    }
    insert(index, value) {
        if (!Number.isInteger(index)) throw new Error("Index is not a integer");
        if (index < 0 || index > this.size()) throw new Error("Index out of range");
        if (index === 0) {
            this.pushFront(value);
            return;
        }
        let newNode = new Node(value);
        let current = this.#head;
        while (index > 1) {
            --index;
            current = current.next;
        }
        newNode.next = current.next;
        current.next = newNode;
    }
    erase(index) {
        if (!Number.isInteger(index)) throw new Error("Index must be an integer");
        if (index < 0 || index >= this.size()) throw new Error("Index out of range");
        if (this.isEmpty()) throw new Error("List is empty");
        if (index === 0) {
            let deleteElement = this.#head.value; 
            this.#head = this.#head.next;
            return deleteElement;
        }
        let current = this.#head;
        while (index > 1) {
                --index;
                current = current.next;
        }
        let deleteNode = current.next.value;
        current.next = current.next.next;
        return deleteNode;
    }
    find(value) {
        if (this.isEmpty()) return -1;
        let current = this.#head;
        let idx = 0;
        while (current) {
             if (current.value === value) {
                return idx;
            }
            current = current.next; 
            ++idx;
        }
    return -1;
    }
    contains(value) {
        if (this.isEmpty()) return false;
        let current = this.#head;
        while (current) {
            if (current.value === value) return true;
            current = current.next;
        }
        return false;
    }
    toArray() {
        if(this.isEmpty())return [];
        let arr = [];
        let current = this.#head;
        while(current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }
    reverse() {
        if (this.isEmpty()) throw new Error("List is empty");
        let prev = null;
        let cur = this.#head;
        let tmp = cur;

        while (cur) {
            tmp = tmp.next;
            cur.next = prev;
            prev = cur;
            cur = tmp;
        }
            this.#head = prev;
    }
    [Symbol.iterator]() {
        let current = this.#head;
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
    *entries() {
        let current = this.#head;
        let index = 0;
        while (current) {
            yield [index++, current.value];
            current = current.next;
        }
    }
}



const list = new SinglyLinkedList();

list.pushBack(10);
list.pushBack(20);
list.pushBack(30);

console.log(list.toArray());


list.pushFront(5);

console.log(list.front());


console.log(list.back());

console.log(list.size());


list.pushBack(40);
list.pushBack(50);
list.pushBack(60);

list.insert(1, 15);

console.log(list.toArray());

console.log(list.erase(2));

list.reverse();
console.log(list.toArray());