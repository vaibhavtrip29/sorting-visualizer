
const is = (array, position, arrayLength, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
            arraySteps.push(array.slice());
            colorKey[j] = 1;
            colorKey[j + 1] = 1;
            colorSteps.push(colorKey.slice());
            colorKey[j] = 0;
            colorKey[j + 1] = 0;
        }
        array[j + 1] = key;
        colorKey[arraySteps.length - 1 - i] = 2;
        arraySteps.push(array.slice());
        colorSteps.push(colorKey.slice());
    }
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
    return;
};

export default is;