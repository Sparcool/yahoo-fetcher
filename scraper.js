'use strict';

const https = require('https');
const cheerio = require('cheerio');

class Scraper {
    constructor(url, query) {
        this.url = url;
        this.query = query;
    }

    fetch() {
        return this.fetchPage().then(html => {
            this.parse(html);

            this.query = this.getNextQuery(html);
            if (this.query) return this.fetch();
        })
    }

    fetchPage() {
        return new Promise((resolve, reject) => {
            https.get(this.url + this.query, res => {
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

    parse(html) {
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

        console.log(data);
    }

    getNextQuery(html) {
        let $ = cheerio.load(html);
        return $('a[rel="next"]').attr('href');
    }
}

module.exports = Scraper;

