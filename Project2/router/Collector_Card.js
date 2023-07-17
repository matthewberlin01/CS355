const collectorCardController = require('../controller/Collector_Card');
const collectorCardRouter = require('koa-router')({
    prefix: '/Collector_Card'
});

collectorCardRouter.get('/', collectorCardController.GetCollectorCards);
collectorCardRouter.get('/:collector', collectorCardController.FindSimilarCollectorCollections);
collectorCardRouter.post('/', collectorCardController.AddCollectorCard);

module.exports = collectorCardRouter;