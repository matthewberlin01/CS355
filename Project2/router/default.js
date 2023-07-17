const cardRouter = require('./Card');
const cardPackRouter = require('./CardPack');
const collectorRouter = require('./Collector');
const collectorCardRouter = require('./Collector_Card');
const collectorCardPackRouter = require('./Collector_CardPack');
const vendorRouter = require('./Vendor');
const vendorCardPackRouter = require('./Vendor_CardPack');
const defaultRouter = require('koa-router')({
    prefix:'/api/v1'
});

defaultRouter.get('/', (context) => {
    context.body = `Welcome to the Card Collector's Database!`
});

//Review Get, Put, Post, and Delete methods so that we can access them.

defaultRouter.use(
    cardRouter.routes(),
    cardPackRouter.routes(),
    collectorRouter.routes(),
    collectorCardRouter.routes(),
    collectorCardPackRouter.routes(),
    vendorRouter.routes(),
    vendorCardPackRouter.routes()
);

module.exports = api =>{
    api.use(defaultRouter.routes());
}