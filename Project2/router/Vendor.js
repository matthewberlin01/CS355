const vendorController = require('../controller/Vendor');
const vendorRouter = require('koa-router')({
    prefix: '/Vendor'
});

vendorRouter.get('/', vendorController.GetVendors);
vendorRouter.get('/ViewInventory', vendorController.ViewInventory);
vendorRouter.delete('/:vendorID', vendorController.RemoveVendor);

module.exports = vendorRouter;