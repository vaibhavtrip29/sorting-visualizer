export function swap(array, i, j) {
    let s = array[i];
    array[i] = array[j];
    array[j] = s;
    return array;
}