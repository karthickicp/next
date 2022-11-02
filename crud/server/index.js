const http = require("http");
const port = 5000;
const users = require("./users");
const server = http.createServer(users);
server.listen(port);
