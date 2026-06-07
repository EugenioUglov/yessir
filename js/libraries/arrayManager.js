class ArrayManager {
    constructor() {

    }

    getSameItemsFromArrays = function(array1, array2) {
        return array1.filter(element => array2.includes(element));
    }

    isValueExistsInArray = function(arr, valueToSearch) {
        for (const indexValue in arr) {
            let currentValueFromArray = arr[indexValue];
            
            if (valueToSearch === currentValueFromArray) {
                return true;
            }
        }

        return false;
    }
}