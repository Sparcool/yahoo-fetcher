var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var fetch = Promise.promisify(require('./fetch'));

var url = 'https://in.finance.yahoo.com/q/hp?s=AAPL&a=00&b=01&c=1991&d=04&e=4&f=2016&g=d';

fetch(url)
    .then(data => {
        return fs.writeFileAsync('fetch.txt', data);
    })
    .then(() => {
        console.log('Finished');
    })
    .catch(err => {
        console.error(err);
    })

