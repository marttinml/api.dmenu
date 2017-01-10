module.exports = function (app) {

    var Business = require('../modules/business/business.controller'),
    		Product = require('../modules/product/product.controller'),
    		Menu 	= require('../modules/menu/menu.controller');
    		// Order 	= require('../modules/order/order.controller');
    
    app.route('/v0/business').post(Business.create);
    app.route('/v0/business').get(Business.retrieve);
    app.route('/v0/business/:businessId').get(Business.detail);
    app.route('/v0/business/:businessId').put(Business.update);
    app.route('/v0/business/:businessId').delete(Business.delete);

    app.route('/v0/business/:businessId/product').post(Product.create);
    app.route('/v0/business/:businessId/product').get(Product.retrieve);
    app.route('/v0/business/:businessId/product/:idProduct').get(Product.detail);
    app.route('/v0/business/:businessId/product/:idProduct').put(Product.update);
    app.route('/v0/business/:businessId/product/:idProduct').delete(Product.delete);

    app.route('/v0/business/:businessId/menu').post(Menu.create);
    app.route('/v0/business/:businessId/menu').get(Menu.retrieve);
    app.route('/v0/business/:businessId/menu/:idMenu').get(Menu.detail);
    app.route('/v0/business/:businessId/menu/:idMenu').put(Menu.update);
    app.route('/v0/business/:businessId/menu/:idMenu').delete(Menu.delete);

    // app.route('/v0/business/:businessId/order').post(Order.create);
    // app.route('/v0/business/:businessId/order').get(Order.retrieve);
    // app.route('/v0/business/:businessId/order/:idOrder').get(Order.detail);
    // app.route('/v0/business/:businessId/order/:idOrder').put(Order.update);
    // app.route('/v0/business/:businessId/order/:idOrder').delete(Order.delete);

};