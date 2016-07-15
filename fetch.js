var https = require('https');

module.exports = function(url, callback) {
    https.get(url, res => {
        var data = '';
        res.on('data', chunk => {
            data += chunk;
        })
        res.on("end", () => {
            callback(null, data);
        })
    })
    .on("error", function() {
        callback(null);
    })
}