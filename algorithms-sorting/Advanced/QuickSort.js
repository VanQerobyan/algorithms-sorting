function quickSort(arr, low, high) {
    if (low < high) {
    let pivotIndex = partitionalFirst(arr, low, high);
    quickSort(arr, pivotIndex + 1, high);
    quickSort(arr, low, pivotIndex - 1);
    }
    return arr;
}

function partitionalFirst(arr, low, high) {
    let i = high + 1;
    let pivot = arr[low];

    for (let j = high; j > low; --j) {
        if (pivot < arr[j]) {
            --i;
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
    }
    [arr[i - 1], arr[low]] = [arr[low], arr[i - 1]];
    return i - 1;
}


let arr = [10, 7, 8, -5, 14, 12, 11];
console.log(quickSort(arr, 0, arr.length - 1));