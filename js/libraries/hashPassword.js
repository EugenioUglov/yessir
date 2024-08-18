class HashPassword {
    getHashedPassword(password) {
        return md5(md5(password));
    }
}