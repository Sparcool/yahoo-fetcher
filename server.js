'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const cheerio = require('cheerio');

const Fetcher = require('./fetch');

let url = 'https://in.finance.yahoo.com/q/hp?s=AAPL&a=00&b=01&c=1991&d=04&e=4&f=2016&g=d';

let fetcher = new Fetcher(url);

fetcher.fetch()
    .then(ht => {
        return fs.writeFileAsync('fetch.txt', data);
    })
    .then(() => {
        console.log('Finished');
    })
    .catch(err => {
        console.error(err);
    })

