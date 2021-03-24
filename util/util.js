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
    }
}