class HashManager {
    #hashPrevious;

    /// Set value of previous hash.
    /// @param {String} if is undefined then set crrent hash as previous.
    /// In the case if is the same hash as previous one then don't save it.
    /// Return boolean value if new hash_previous is set.
    setValueForPreviousHash(newHashPrevious) {
        if (newHashPrevious === this.#hashPrevious) return false;

        this.#hashPrevious = newHashPrevious != undefined ? newHashPrevious : window.location.hash;

        return true;
    }


    setPreviousHash() {
        if (this.#hashPrevious) {
            window.location.hash = this.#hashPrevious;
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