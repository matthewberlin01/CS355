const cardPackController = require('../controller/CardPack');
const cardPackRouter = require('koa-router')({
    prefix: '/CardPack'
});

cardPackRouter.get('/', cardPackController.GetCardPacks);
cardPackRouter.get('/:seriesNumber', cardPackController.GetCardPackByID);

module.exports = cardPackRouter;