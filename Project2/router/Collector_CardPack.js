const collectorCardPackController = require('../controller/Collector_CardPack');
const collectorCardPackRouter = require('koa-router')({
    prefix: '/Collector_CardPack'
});

collectorCardPackRouter.get('/', collectorCardPackController.GetCollectorCardPacks);
collectorCardPackRouter.post('/', collectorCardPackController.AddCollectorCardPack);
collectorCardPackRouter.delete('/:collector/:cardPack', collectorCardPackController.RemoveCollectorCardPack);

module.exports = collectorCardPackRouter;