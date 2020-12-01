const http = require("http");
const url = require("url");

http
  .createServer(function (req, res) {
    const pathname = url.parse(req.url).pathname;
    res.writeHead(301, { Location: "https://cometx.io" + pathname });
    res.end();
  })
  .listen(8080);
