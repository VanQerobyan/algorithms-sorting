function insertionSort(arr) {
    let size = arr.length;

    for (let i = 1; i < size; ++i) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && key < arr[j]) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = key;
    }
     return arr;
}
let arr = [7, 2, 0, -2, 8, 5];
console.log(insertionSort(arr));