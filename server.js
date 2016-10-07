var MongoDB = require('./app/config/mongodb'),
    express  = require('./app/config/express'),
    app      = express();


var port = process.env.PORT || 2000;
app.listen(port, function () {
    console.log("\n - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    console.log(" |     API REST [api.node] - http://localhost:" + port + "   | ");
    console.log(" - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n");
});

