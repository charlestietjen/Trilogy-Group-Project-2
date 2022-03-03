
module.exports = {
     // Date format dd/mm/yyyy
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    // Returns Puralized versions
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }

        return word;
    },
    // Time format hh:mm
    format_time: time => {
        return `${new Date(time).getHours()}:${new Date(time).getMinutes()}`;
    },
};