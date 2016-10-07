module.exports = function (app) {
    var Structure = require('./structure.controller');
    
    app.route('/v0/structure/:idBusiness/:idMenu').post(Structure.create);
    app.route('/v0/structure/:idBusiness/:idMenu').get(Structure.retrieve);
    app.route('/v0/structure/:idBusiness/:idMenu/:idStructure').get(Structure.detail);
    app.route('/v0/structure/:idBusiness/:idMenu/:idStructure').put(Structure.update);
    app.route('/v0/structure/:idBusiness/:idMenu/:idStructure').delete(Structure.delete);
};