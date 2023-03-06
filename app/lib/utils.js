const { DateTime } = require("luxon");

function format_datetime(date) {
    const datetime = DateTime.fromJSDate(date);
    return datetime.toUTC().toFormat("yyyy-MM-dd HH:mm:ss");
}

module.exports = {
    format_datetime: format_datetime
}