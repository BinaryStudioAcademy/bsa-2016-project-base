/**
 * Created by user on 12.08.2016.
 */
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dckmeyruw',
    api_key: '231739829115868',
    api_secret: 'FPthr-SaRvtsUmTdWsX0pi8d1SU'
});

var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    var stream = cloudinary.uploader.upload_stream(function(result) {
        console.log(result)
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length")
        response.end(JSON.stringify({location:result.url}))
    });
    request.pipe(stream)
});
server.listen(3001);
