function cumulativeCounting(arr) {
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let range = max - min + 1;
    let countArr = new Array(range).fill(0);
    let result = new Array(arr.length).fill(0);


    for (let i = 0; i < arr.length; ++i) {
        let idx = arr[i] - min;
        ++countArr[idx];
    }


    for (let i = 1; i < countArr.length; ++i) {
        countArr[i] += countArr[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; --i) {
        let elem = arr[i];
        let idx = --countArr[elem - min];
        result[idx] = elem;
    }
    return result;
}

let arr = [4, 2, 7, 2, 4, 8, 9, 1, 2, 1, 7, 8];
console.log(cumulativeCounting(arr));