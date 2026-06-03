function mergeSort(arr) {
    let size = arr.length;
    if (size === 1) return arr;
    let middleIndex = Math.floor(size/2);
    let leftArr = arr.slice(0, middleIndex);
    let rightArr = arr.slice(middleIndex);
    leftArr = mergeSort(leftArr);
    rightArr = mergeSort(rightArr);
    return merge(leftArr, rightArr);
}

function merge(leftArr, rightArr) {
    let result = [];
    let i = 0; 
    let j = 0;

    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            result.push(leftArr[i++]);
        } else {
            result.push(rightArr[j++]);
        }
    }
    while (i < leftArr.length) {
        result.push(leftArr[i++]);
    }
    while (j < rightArr.length) {
        result.push(rightArr[j++]);
    }
    return result;
}

let arr = [4, 7, -8, 0, 2, 5, -1, 3];
console.log(mergeSort(arr));