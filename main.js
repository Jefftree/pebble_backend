var restify = require('restify')
var request = require('request')
var fs = require('fs');
var sys = require('sys'),
    exec = require('child_process').exec;

var server = restify.createServer({
    name: 'pebble',
    version: '1.0.0'
})

server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser())
server.use(restify.bodyParser())

var notes = fs.readFileSync('notes.txt').toString().split("\n");
notes.pop();
notes.push('END');

server.post('/post', function (req, res, next) {
    res.send({hi:'hi'})
    return next()
})

server.get('/notes', function (req, res, next) {
    var note_list = {notes: notes};
    res.send(JSON.stringify(note_list))
    return next();
})

server.get('/refresh', function (req, res, next) {
    exec('extract.sh /media/external/' + req.params.movie,
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            notes = fs.readFileSync('notes.txt').toString().split("\n");
            notes.pop();
            notes.push('END');
            res.send({done: 'done'})
            return next();
    });
})

var port = process.env.PORT || 8080;
    server.listen(port, function () {
    console.log('%s listening at %s', server.name, server.url)
})
