function single_quote_escape(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            try {
                if (obj[key].includes("'")) {
                    obj[key] = obj[key].replace(/'/g, "''");
                }
                else {
                    obj[key] = obj[key];
                }
            } catch (Exception) { obj[key] = obj[key] }
        }
    }
    return obj;
}
module.exports = single_quote_escape;