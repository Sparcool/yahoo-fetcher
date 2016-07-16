'use strict';
const Scraper = require('./scraper');

let baseUrl = 'https://in.finance.yahoo.com';
let firstQuery = '/q/hp?s=AAPL&a=00&b=01&c=1991&d=04&e=4&f=2016&g=d&z=66&y=0';
let destination = process.argv[2];

if (!destination) return console.error('Error: you need to specify a destination path for the output file.');

let scraper = new Scraper(baseUrl, firstQuery, destination);

scraper.scrap()
    .then(() => null)
    .catch(err => console.error(err))

