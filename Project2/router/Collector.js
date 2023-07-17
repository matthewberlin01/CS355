const collectorController = require('../controller/Collector');
const collectorRouter = require('koa-router')({
    prefix: '/Collector'
});

collectorRouter.get('/', collectorController.GetCollectors);
collectorRouter.get('/FindMissingCardNumber/:collectorID/:cardPack', collectorController.FindMissingCards);
collectorRouter.get('/:collectorID', collectorController.GetCollectorByID);
collectorRouter.put('/:collectorID', collectorController.UpdateCollector);

module.exports = collectorRouter;