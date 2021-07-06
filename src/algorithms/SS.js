
const ss = (array, position, arrayLength, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    
    for (let i = 0; i < array.length - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[min_idx]) {
                min_idx = j;
            }
            arraySteps.push(array.slice());
            colorKey[j] = 1;
            colorKey[j + 1] = 1;
            colorSteps.push(colorKey.slice());
            colorKey[j] = 0;
            colorKey[j + 1] = 0;
        }
        let temp = array[min_idx];
        array[min_idx] = array[i];
        array[i] = temp;
        colorKey[arraySteps.length - 1 - i] = 2;
        arraySteps.push(array.slice());
        colorSteps.push(colorKey.slice());
    }
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
    return;
};

export default ss;