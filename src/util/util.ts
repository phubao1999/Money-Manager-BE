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

    getTimeStampNowAsTokenTime() {
        const date = new Date();
        return Math.floor(date.getTime() / 1000);
    },

    getTokenString(string) {
        return string.split(' ')[1];
    },

    gennerateAsMd5(string) {
        return md5(string);
    },

    compareStringAsMd5(stringToMD5, stringAsMD5) {
        return md5(stringToMD5) === stringAsMD5;
    },

    getTokenString(requestHeader) {
        return requestHeader.headers['authorization'].split(' ')[1];
    }
}