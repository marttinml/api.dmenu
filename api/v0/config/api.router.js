module.exports = function (app) {

    var Business = require('../modules/business/business.controller'),
    		Product = require('../modules/product/product.controller'),
    		Menu 	= require('../modules/menu/menu.controller');
    		// Order 	= require('../modules/order/order.controller');
    
    app.route('/v0/business').post(Business.create);
    app.route('/v0/business').get(Business.retrieve);
    app.route('/v0/business/:idBusiness').get(Business.detail);
    app.route('/v0/business/:idBusiness').put(Business.update);
    app.route('/v0/business/:idBusiness').delete(Business.delete);

    app.route('/v0/business/:idBusiness/product').post(Product.create);
    app.route('/v0/business/:idBusiness/product').get(Product.retrieve);
    app.route('/v0/business/:idBusiness/product/:idProduct').get(Product.detail);
    app.route('/v0/business/:idBusiness/product/:idProduct').put(Product.update);
    app.route('/v0/business/:idBusiness/product/:idProduct').delete(Product.delete);

    app.route('/v0/business/:idBusiness/menu').post(Menu.create);
    app.route('/v0/business/:idBusiness/menu').get(Menu.retrieve);
    app.route('/v0/business/:idBusiness/menu/:idMenu').get(Menu.detail);
    app.route('/v0/business/:idBusiness/menu/:idMenu').put(Menu.update);
    app.route('/v0/business/:idBusiness/menu/:idMenu').delete(Menu.delete);

    // app.route('/v0/business/:idBusiness/order').post(Order.create);
    // app.route('/v0/business/:idBusiness/order').get(Order.retrieve);
    // app.route('/v0/business/:idBusiness/order/:idOrder').get(Order.detail);
    // app.route('/v0/business/:idBusiness/order/:idOrder').put(Order.update);
    // app.route('/v0/business/:idBusiness/order/:idOrder').delete(Order.delete);

};