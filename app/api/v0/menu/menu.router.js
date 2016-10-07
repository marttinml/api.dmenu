module.exports = function (app) {
    var Menu = require('./menu.controller');
    
    app.route('/v0/menu/:idBusiness').post(Menu.create);
    app.route('/v0/menu/:idBusiness').get(Menu.retrieve);
    app.route('/v0/menu/:idBusiness/:idMenu').get(Menu.detail);
    app.route('/v0/menu/:idBusiness/:idMenu').put(Menu.update);
    app.route('/v0/menu/:idBusiness/:idMenu').delete(Menu.delete);
};