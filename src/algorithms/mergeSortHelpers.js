export function merge(array, position, m, arrayLength, arraySteps, colorSteps) {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    
    let n1 = m - position + 1;
    let n2 = arrayLength - m;

    let L = [];
    let R = [];

    for (let i = 0; i < n1; i++) {
        L[i] = array[position + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = array[m + 1 + j];
    }

    let i = 0;
    let j = 0;
    
    let k = position;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            array[k] = L[i];
            i++;
            arraySteps.push(array.slice());
            colorKey[j] = 1;
            colorKey[j + 1] = 1;
            colorSteps.push(colorKey.slice());
            colorKey[j] = 0;
            colorKey[j + 1] = 0;
        }
        else {
            array[k] = R[j];
            j++;
            arraySteps.push(array.slice());
            colorKey[j] = 1;
            colorKey[j + 1] = 1;
            colorSteps.push(colorKey.slice());
            colorKey[j] = 0;
            colorKey[j + 1] = 0;
        }
        //arraySteps.push(array.slice());
        //colorKey[j] = 1;
        //colorKey[j + 1] = 1;
        //colorSteps.push(colorKey.slice());
        //colorKey[j] = 0;
        //colorKey[j + 1] = 0;
        //colorKey[arraySteps.length - 1 - i] = 2;
        //arraySteps.push(array.slice());
        //colorSteps.push(colorKey.slice());
        k++;
    }
    colorKey[arraySteps.length - 1 - i] = 2;
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());

    while (i < n1) {
        array[k] = L[i];
        arraySteps.push(array.slice());
        colorKey[j] = 1;
        colorKey[j + 1] = 1;
        colorSteps.push(colorKey.slice());
        colorKey[j] = 0;
        colorKey[j + 1] = 0;
        i++;
        k++;
       // colorKey[arraySteps.length - 1 - i] = 2;
       // arraySteps.push(array.slice());
       // colorSteps.push(colorKey.slice());
    }
    //arraySteps.push(array.slice());
    //colorKey[j] = 1;
    //colorKey[j + 1] = 1;
    //colorSteps.push(colorKey.slice());
    //colorKey[j] = 0;
    //colorKey[j + 1] = 0;
    colorKey[arraySteps.length - 1 - i] = 2;
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());

    while (j < n2) {
       array[k] = R[j];
       arraySteps.push(array.slice());
       colorKey[j] = 1;
       colorKey[j + 1] = 1;
       colorSteps.push(colorKey.slice());
       colorKey[j] = 0;
       colorKey[j + 1] = 0;
        j++;
        k++;
        //colorKey[arraySteps.length - 1 - i] = 2;
        //arraySteps.push(array.slice());
        //colorSteps.push(colorKey.slice());
    }
    //arraySteps.push(array.slice());
    //colorKey[j] = 1;
    //colorKey[j + 1] = 1;
    //colorSteps.push(colorKey.slice());
    //colorKey[j] = 0;
    //colorKey[j + 1] = 0;
    colorKey[arraySteps.length - 1 - i] = 2;
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
}