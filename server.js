var MongoDB 	= require('./api/v0/config/mongodb'),
    express  	= require('./api/v0/config/express'),
    app      	= express(),
    port;

// process.env.TZ = "GMT-0600";
port = process.env.PORT || 2000;

app.listen(port, function () {
    console.log("\n - - - - - - - - - - - - - - - - - - - - - - - - - - - -");
    console.log(" |     API REST [api.node] - http://localhost:" + port + "   | ");
    console.log(" - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n");
});

