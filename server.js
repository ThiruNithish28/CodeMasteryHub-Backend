const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
  res.send("backend is working fine");
});

app.post("/login", (req, res) => {
  //login functionality
});
app.post("/signup", (req, res) => {
  //signup functionality
});
app.listen(3000, () => {
  console.log("connected to the port 3000....");
});
