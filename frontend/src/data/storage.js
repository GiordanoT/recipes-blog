class Storage {
    static read(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    static write(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    static reset() {
        localStorage.clear();
    }
}

export default Storage;
