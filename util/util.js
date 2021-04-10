const md5 = require('md5');

module.exports = {

    /**
     * 
     * @returns Date time as mm-MM-YY
     */
    getDateNowAsTimeStamp() {
        const date = new Date();
        const dateNow = `${date.getDay()}-${date.getMonth() - 1}-${date.getFullYear()}`
        const newDate = new Date(dateNow);
        return newDate.getTime();
    },

    /**
     * 
     * @returns Get time now as time stamp
     */
    getTimeStampNow() {
        const date = new Date();
        return date.getTime();
    },

    getTokenString(string) {
        return string.split(' ')[1];
    },

    gennerateAsMd5(string) {
        return md5(string);
    },

    compareStringAsMd5(string1, string2) {
        return md5(string1) === md5(string2);
    }
}