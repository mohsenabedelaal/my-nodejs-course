const http = require("http");
const fs = require("fs");
const hostname = "localhost";
const port = 3000;
const christmas = "2022-12-25";
const moment = require("moment");
console.log(moment(christmas).format("LL"));
//install nodemode
const server = http.createServer((req, res) => {
  //   console.log(req.url);
  //   console.log(req.method);
  res.setHeader("Content-Type", "text/html");
  //   res.write("<h3>Welcome to mohsen website</h3>");
  let route = "./views/";
  switch (req.url) {
    case "/":
      route += "index.html";
      res.statusCode = 200;
      break;
    case "/contact":
      route += "contact.html";
      res.statusCode = 200;
      break;
    case "/contact-us":
      // redirect status
      route += "contact.html";
      res.statusCode = 301;
      res.setHeader("Location", "/contact");
      //   res.end();
      break;
    default:
      route += "404.html";
      res.statusCode = 400;
      break;
  }
  fs.readFile(route, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // res.end(data);
      res.write(data);
    }
    res.end();
  });
});
server.listen(port, hostname, () => {
  console.log(`listening on port ${port}`);
});
