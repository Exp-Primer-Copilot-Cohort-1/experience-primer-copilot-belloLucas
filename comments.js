// Create web server

// Load the http module to create an http server.
var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var querystring = require("querystring");
var comments = require("./comments");
var commentsFilePath = path.join(__dirname, "comments.json");

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var pathname = url.parse(request.url).pathname;
  if (pathname === "/comments" && request.method === "GET") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(comments.get()));
  } else if (pathname === "/comments" && request.method === "POST") {
    var postData = "";
    request.on("data", function (chunk) {
      postData += chunk;
    });
    request.on("end", function () {
      var newComment = querystring.parse(postData);
      comments.add(newComment);
      fs.writeFile(
        commentsFilePath,
        JSON.stringify(comments.get()),
        function (err) {
          if (err) {
            console.log("Error writing comments file", err);
          }
        }
      );
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(comments.get()));
    });
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("404 Not Found\n");
  }
});

// Listen on port 8000, IP defaults to
