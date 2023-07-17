const cardController = require('../controller/Card');
const cardRouter = require('koa-router')({
    prefix: '/Card'
});

cardRouter.get('/', cardController.GetCards);
cardRouter.get('/:name', cardController.DisplaySimilarCards);
cardRouter.put('/:cardNumber/:cardPack', cardController.UpdateCard);

module.exports = cardRouter;