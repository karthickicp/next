const url = require("url");
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
  const reqUrl = req.url;
  const headers = {
    "Access-Control-Allow-Origin": "*" /* @dev First, read about security */,
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, DELETE",
    // "Access-Control-Max-Age": 2592000, // 30 days
    /** add other headers as per requirement */
  };
  console.log(req, "req");
  //GET Users
  if (reqUrl === "/users") {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200, headers);
    res.end(JSON.stringify(data));
  }

  //DELETE User

  if (reqUrl.includes("/user/delete")) {
    let query = url.parse(reqUrl, "id").query;
    let filteredData = data.filter((data) => data.id !== Number(query.id));
    data = filteredData;
    console.log(data, "data");
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200, headers);
    res.end("user is deleted");
  }
};

module.exports = usersApi;
