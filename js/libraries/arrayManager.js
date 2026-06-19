class ArrayManager {
    constructor() {

    }

    /**
     * Get items that repeats in 2 arrays.
     * @param {array} array1 
     * @param {array} array2 
     * @returns array of elements found in both arrays.
     */
    getSameItemsFromArrays = function(array1, array2) {
        return array1.filter(element => array2.includes(element));
    }

    /**
     * Chack if value exists in array by check each element.
     * @param {array} arr 
     * @param {*} valueToSearch 
     * @returns boolean
     */
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