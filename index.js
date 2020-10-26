// 1- DEPENDENCIES:
const express = require("express");
const generate = require("shortid").generate;

// 2- INSTANTIATE AND CONFIGURE THE SERVER:
const server = express(); // <<<This is the app
server.use(express.json()); // plug middlware

// 3- DECIDE A PORT NUMBER:
const PORT = 3000

// 4- FAKE DATA
let users = [
  {
    id: generate(), // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
];

// 5- ENDPOINTS
// [GET] all dogs in the db
server.get("/users", (req, res) => {
  res.status(200).json(users);
});

// [GET, POST...] catch all endpoint (404 resource not found)
server.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found!' })
})

// 6- LISTEN FOR INCOMING REQUESTS
server.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`)
})