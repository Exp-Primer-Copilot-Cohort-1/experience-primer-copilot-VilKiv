// Create web server
// Run server
// Load comments from file
// Add comments to file
// Create a form to submit comments
// Show comments
// Add comments to the page

var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var url = require('url');

var comments = [];

var server = http.createServer(function(req, res) {
  var path = url.parse(req.url).pathname;
  if (path === '/') {
    if (req.method === 'POST') {
      var body = '';
      req.on('data', function(data) {
        body += data;
      });
      req.on('end', function() {
        var comment = qs.parse(body).comment;
        comments.push(comment);
        fs.appendFile('comments.txt', comment + '\n');
        res.end('Comment added');
      });
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<form method="POST">');
      res.write('<textarea name="comment"></textarea>');
      res.write('<input type="submit" value="Submit">');
      res.write('</form>');
      comments.forEach(function(comment) {
        res.write('<p>' + comment + '</p>');
      });
      res.end();
    }
  } else if (path === '/comments.txt') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    fs.readFile('comments.txt', function(err, data) {
      res.end(data);
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
  }
});

server.listen(3000, function() {
  console.log('Server running on port 3000');
});


