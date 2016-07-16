'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const cheerio = require('cheerio');

const Fetcher = require('./fetch');

let url = 'https://in.finance.yahoo.com/q/hp?s=AAPL&a=00&b=01&c=1991&d=04&e=4&f=2016&g=d';

let fetcher = new Fetcher(url);

fetcher.fetch()
    .then(html => {
        let $ = cheerio.load(html);
        let data = '';
        $('table.yfnc_datamodoutline1 tr:not(:first-child):not(:last-child)').each(function() {
            let entry = $(this);
            if (entry.children().length === 7) {
                let date = new Date(entry.children().first().text()).toISOString();
                let close = entry.children().eq(4).text();
                let volume = (entry.children().eq(5).text()).replace(/\,/g,'');

                data += `${date},${close},${volume}\n`;
            }
        })
        return fs.writeFileAsync('fetch.txt', data);
    })
    .then(() => {
        console.log('Finished');
    })
    .catch(err => {
        console.error(err);
    })

