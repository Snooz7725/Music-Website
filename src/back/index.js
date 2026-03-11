// Express is a framework that handles requests to the back-end
import express from "express";
const _express = express(); // New instance

_express.use(express.json()); // JSON obj -> JS obj

// GET request
// "/posts" - the url being searched for
// "req" - the request obj
    // req.method
    // req.url
    // req.headers
    // req.body
// "res" - the response obj
_express.get("/posts", (req, res) => {
  console.log("Received GET request");
  res.json({ message: "Here is your data" });
});

// POST request
_express.post("/posts", (req, res) => {
  console.log("Received POST request");
  console.log("Body:", req.body);
  res.json({ message: "Data received", yourData: req.body });
});

_express.listen(3000, () => console.log("Server running on port 3000"));