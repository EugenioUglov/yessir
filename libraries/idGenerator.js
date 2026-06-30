class IdGenerator {
    /**
     * Get unique id with verify this id doesn't exist in Map yet. 
     *
     * @param {map} map - map structure with id as a key.
     * @returns {string} unique id.
     */
    static getCryptoUniqueIdForMap(map) {
        let id;

        do {
            id = crypto.randomUUID();
        } while (map.has(id)); // 100% no collisions with other id.
        
        return id;
    }
}