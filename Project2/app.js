const koa = require('koa');
const koajson = require('koa-json');
const koabodyparser = require('koa-body-parser');
const defaultRouter = require('./router/default.js');
const api = new koa();

const API_PORT = 8044;

api.use(koajson());
api.use(koabodyparser());

defaultRouter(api);

api.listen(API_PORT);
