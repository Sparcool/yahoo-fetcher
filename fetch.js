'use strict';

const https = require('https');

class Fetcher {
    constructor(url) {
        this.url = url;
    }

    fetch() {
        return new Promise((resolve, reject) => {
            https.get(this.url, res => {
                let data = '';
                res.on('data', chunk => {
                    data += chunk;
                })
                res.on('end', () => {
                    resolve(data);
                })
            })
            .on('error', function() {
                reject(null);
            })
        })
    }
}

module.exports = Fetcher;

