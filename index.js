var express =  require("express");
var app = express();

app.use(express.static('public'));

var server = app.listen(8080, function () {
    console.log('Benefits with friends listening on ' + server.address().port);
});

