export default {
    upLoadUrl: 'http://api.es-career.com/api/upload',
    getStore(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    setStore(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};