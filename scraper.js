'use strict';

const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio');
const ProgressBar = require('progress');

class Scraper {
    constructor(url, query, destination) {
        this.url = url;
        this.query = query;
        this.destination = destination;

        this.bar = new ProgressBar('  downloading [:bar] :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: 6336
        })
    }

    scrap() {
        return this.fetch().then(html => {
            this.parse(html);
            this.bar.tick(66);
            this.query = this.getNextQuery(html);
            if (this.query) return this.scrap();
        })
    }

    fetch() {
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

    writeToFile(data) {
        fs.appendFile(`${this.destination}/APPL.txt`, data);
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
        this.writeToFile(data);
    }

    getNextQuery(html) {
        let $ = cheerio.load(html);
        return $('a[rel="next"]').attr('href');
    }
}

module.exports = Scraper;

