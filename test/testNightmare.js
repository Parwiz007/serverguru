// var nightmare = require("../controller/nightmare");
var sites = ['www.google.com', 'www.yahoo.com', 'www.etrade.com','www.lizstrom.com','www.creativecalmsolutions.com']

// nightmare(sites);

var Nightmare = require('nightmare');

sites.reduce(site=>{
  (async () => { 
    const n = new Nightmare({show: true, gotoTimeout: 10000, waitTimeout: 1000,pollInterval: 50}); 
    await n.goto('https://'+ site); 
    return { n };
  })().then(({ n }) => console.log(n))

})
