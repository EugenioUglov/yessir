class UrlValidator {
    static getValidUrl(url) {
        let validUrl = url;

        if (url.toLowerCase().includes("http://") === false && url.toLowerCase().includes("https://") === false) {
            validUrl = "http://" + url;
        }

        return validUrl;
    }
}