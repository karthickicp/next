const url = require("url");
const { parse } = require("querystring");
let data = [
  {
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  },
  {
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
  },
  {
    id: 3,
    email: "emma.wong@reqres.in",
    first_name: "Emma",
    last_name: "Wong",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
  },
  {
    id: 4,
    email: "eve.holt@reqres.in",
    first_name: "Eve",
    last_name: "Holt",
    avatar: "https://reqres.in/img/faces/4-image.jpg",
  },
  {
    id: 5,
    email: "charles.morris@reqres.in",
    first_name: "Charles",
    last_name: "Morris",
    avatar: "https://reqres.in/img/faces/5-image.jpg",
  },
  {
    id: 6,
    email: "tracey.ramos@reqres.in",
    first_name: "Tracey",
    last_name: "Ramos",
    avatar: "https://reqres.in/img/faces/6-image.jpg",
  },
];

const usersApi = (req, res) => {
  const reqUrl = url.parse(req.url);
  const headers = {
    "Access-Control-Allow-Origin": "*" /* @dev First, read about security */,
    "Access-Control-Allow-Methods": "POST, GET, DELETE, PUT",
    // "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per requirement */
  };
  //GET Users
  if (reqUrl.pathname === "/users") {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200, headers);
    return res.end(
      JSON.stringify({ data: data, message: "users list retrieved" })
    );
  }

  //DELETE User

  if (reqUrl.pathname === "/user/delete") {
    let userId = url.parse(req.url, "id").query;
    let filteredData = data.filter((data) => data.id !== Number(userId.id));
    data = filteredData;
    res.setHeader("Content-Type", "application/josn");
    res.writeHead(200, headers);
    return res.end(JSON.stringify({ message: "user deleted success" }));
  }

  // ADD User

  if (reqUrl.pathname === "/users/create" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body = chunk.toString()));
    req.on("end", () => {
      body = JSON.parse(body);
      let newUser = { id: data.length + 1, ...body };
      data.push(newUser);
    });
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200, headers);
    return res.end(JSON.stringify({ message: "new user added success" }));
  }

  if (reqUrl.pathname === "/users/update") {
    let body;
    let userId = url.parse(req.url, "id").query;
    req.on("data", (chunk) => (body = chunk.toString()));
    req.on("end", () => {
      if (body) {
        body = JSON.parse(body);
        data.forEach((data) => {
          if (data.id == Number(userId.id)) {
            if (data.first_name != body.first_name) {
              data.first_name = body.first_name;
            }
            if (data.last_name != body.last_name) {
              data.last_name = body.last_name;
            }
            if (data.email != body.email) {
              data.email = body.email;
            }
            // console.log(data, "data");
          }
        });
      }
      res.setHeader("Content-Type", "application/json");
      res.writeHead(201, headers);
      return res.end(JSON.stringify({ message: "user updated success" }));
    });
  }
};
module.exports = usersApi;
