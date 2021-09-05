const express = require("express");
var cors = require("cors");
var axios = require("axios");

var app = express();

app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  try {
    console.log("GET /");
    res.send("HOME").status(200);
  } catch (error) {
    console.error("ERROR: /", error);
    res.send("Error /").status(500);
  }
});

app.post("/post", async (req, res) => {
  try {
    console.log("POST /post req", req);

    console.log("POST /post req.headers", req.headers);
    console.log("POST /post req.body", req.body);

    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log("clientIp", clientIp); // clientIp address of the user

    const payload = {
      secret: "6LeNrUYcAAAAAImiLzUNVVGnBblsYvSDjS7QHrWo",
      response: req.body.recaptcha.value,
      remoteip: clientIp,
    };

    console.log("payload", payload);

    const googleResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      payload
    );

    console.log("googleResponse.data", googleResponse.data);

    res.send("/post").status(200);
  } catch (error) {
    console.error("ERROR: /post", error);
    res.send("ERROR: /post").status(403);
  }
});

app.listen(8000, () => console.log("API running on 8000"));
