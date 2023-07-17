const vendorCardPackController = require('../controller/Vendor_CardPack');
const vendorCardPackRouter = require('koa-router')({
    prefix: '/Vendor_CardPack'
});

vendorCardPackRouter.get('/', vendorCardPackController.GetVendorCardPacks);
vendorCardPackRouter.get('/FindRepeatVendors/:vendor', vendorCardPackController.FindRepeatVendors);
vendorCardPackRouter.post('/', vendorCardPackController.AddVendorCardPack);

module.exports = vendorCardPackRouter;