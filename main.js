var restify = require('restify')
var request = require('request')

var server = restify.createServer({
    name: 'pebble',
    version: '1.0.0'
})

server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser())
server.use(restify.bodyParser())

server.post('/post', function (req, res, next) {

    res.send({hi:'hi'})
    return next()
})

server.get('/get/:hi', function (req, res, next) {
    res.send({hi:req.params.hi})
    return next();
})

var port = process.env.PORT || 8080;
    server.listen(port, function () {
    console.log('%s listening at %s', server.name, server.url)
})
