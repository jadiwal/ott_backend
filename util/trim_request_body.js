function trim_request_body(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            try {
                    obj[key] = obj[key].trim();
            } catch (Exception) { obj[key] = obj[key] }
        }
    }
    return obj;
}
module.exports = trim_request_body;