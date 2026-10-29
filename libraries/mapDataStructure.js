/**
 * A utility class for serializing and deserializing JavaScript `Map` 
 * structures to and from JSON strings.
 */
class MapDataStructure {
    /**
     * Checks whether the provided data is an instance of a `Map`.
     * 
     * @param {*} dataToCheck - The value to check.
     * @returns {boolean} Returns true if the data is a Map, otherwise false.
     */
    isMap(dataToCheck) {
        return dataToCheck instanceof Map || Object.prototype.toString.call(dataToCheck) === '[object Map]';
    }

    /**
     * Converts a `Map` (including nested Maps) into a JSON string representation.
     * 
     * @param {Map} map - The Map instance to serialize.
     * @returns {string} The JSON string representing the serialized Map.
     */
    getStringified(map) {
        return JSON.stringify(map, (k, v) => this.#replacer(k, v));
    }

    /**
     * Parses a JSON string back into a `Map` structure.
     * 
     * @param {string} mapString - The JSON string containing the serialized Map data.
     * @returns {Map} The restored Map instance.
     */
    getParsed(mapString) {
        return JSON.parse(mapString, (key, value) => this.#reviver(key, value));
    }

    /**
     * Custom replacer function for JSON.stringify to handle Map serialization.
     * 
     * @private
     * @param {string} key - The current property key.
     * @param {*} value - The current property value.
     * @returns {*} The transformed value suitable for JSON conversion.
     */
    #replacer(key, value) {
        if (value instanceof Map) {
            return {
                _type: "map",
                map: Array.from(value.entries()),
            };
        }
        return value;
    }
    
    /**
     * Custom reviver function for JSON.parse to restore Map instances.
     * 
     * @private
     * @param {string} key - The current property key.
     * @param {*} value - The current property value.
     * @returns {*} The restored value, converting map objects back to Map instances.
     */
    #reviver(key, value) {
        if (value && typeof value === 'object' && value._type === "map") {
            return new Map(value.map);
        }

        return value;
    }
}