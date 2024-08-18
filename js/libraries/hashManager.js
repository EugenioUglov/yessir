class HashManager {
    #hash_previous;

    constructor() {
        this.#hash_previous;
    }

    /// Set value of previous hash.
    /// @param {String} if is undefined then set crrent hash as previous.
    /// In the case if is the same hash as previous one then don't save it.
    /// Return boolean value if new hash_previous is set.
    setValueForPreviousHash(new_hash_previous) {
        if (new_hash_previous === this.#hash_previous) return false;

        this.#hash_previous = new_hash_previous != undefined ? new_hash_previous : window.location.hash;

        return true;
    }


    setPreviousHash() {
        if (this.#hash_previous) {
            window.location.hash = this.#hash_previous;
        }
    }

    getNormalizedCurrentHash() {
        return window.location.hash.toLowerCase();
    }

    getConvertedHashToObject() {
        const hash2Obj = window.location.hash
            .split("&")
            .map(v => v.split("="))
            .reduce( (pre, [key, value]) => ({ ...pre, [key]: value }), {} );

        return hash2Obj;
    }
}