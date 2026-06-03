function selectionSort(arr) {

    for (let i = 0; i < arr.length - 1; ++i) {
        let idx = i;
        for (let j = i + 1; j < arr.length; ++j) {
            if (arr[idx] > arr[j]) {
                idx = j;
            }
        }
        let tmp = arr[idx];
        arr[idx] = arr[i];
        arr[i] = tmp;
    }
    return arr;
}

let arr = [14, 67, 8, 42, 13, 9];
console.log(selectionSort(arr));
