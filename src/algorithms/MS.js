import {merge} from './mergeSortHelpers';

const ms = (array, position, arrayLength, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    
    if (position < arrayLength) {
        let m = position + ((arrayLength-position) / 2);
        ms(array, position, m, arraySteps, colorSteps);
        ms(array, m + 1, arrayLength, arraySteps, colorSteps);
        merge(array, position, m, arrayLength, arraySteps, colorSteps);
        //arraySteps.push(array.slice());
    }
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
    return;
};

export default ms;