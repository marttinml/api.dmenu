module.exports = function (app) {
    var Business = require('./business.controller');
    
    app.route('/v0/business').post(Business.create);
    app.route('/v0/business').get(Business.retrieve);
    app.route('/v0/business/:idBusiness').get(Business.detail);
    app.route('/v0/business/:idBusiness').put(Business.update);
    app.route('/v0/business/:idBusiness').delete(Business.delete);
};