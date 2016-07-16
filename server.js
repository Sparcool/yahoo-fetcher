'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const Scraper = require('./scraper');

let baseUrl = 'https://in.finance.yahoo.com';

let query = '/q/hp?s=AAPL&a=00&b=01&c=1991&d=04&e=4&f=2016&g=d';

let scraper = new Scraper(baseUrl, query);

scraper.fetch()
    .then(() => {
        console.log('Finished');
    })
    .catch(err => {
        console.error(err);
    })

