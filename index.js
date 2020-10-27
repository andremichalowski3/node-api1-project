// 1- DEPENDENCIES:
const express = require("express");
const generate = require("shortid").generate;

// 2- INSTANTIATE AND CONFIGURE THE SERVER:
const server = express(); // <<<This is the app
server.use(express.json()); // plug middlware

// 3- DECIDE A PORT NUMBER:
const PORT = 3000;

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

//(SEE LAST LINES FOR MORE STEPS AFTER CRUD ENDPOINTS)

//////////////////////////////////////////////////////////////////

//CRUD 1: POST

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  // console.log(name, bio)
  console.log(req.body);
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (name && bio) {
    const newUser = { id: generate(), name, bio };
    users.push(newUser);
    res.status(201).json(newUser);
    //??? Does this condition work
  } else {
    res
      .status(500)
      .json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
  }
});

//CRUD 2: GET

server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  // console.log(id)
  const user = users.find((user) => user.id === id);
  // console.log(user)
  if (!user) {
    res
      .status(404)
      .json({
        message: `The user with the specified id: ${id} does not exist.`,
      });
  } else if (user) {
    //Couldn't test this condition
    res.status(200).json(user);
  } else {
    //??? Does this work?
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
});

//CRUD 3: DELETE

//CRUD 4: PUT

//////////////////////////////////////////////////////////////////

// [GET, POST...] catch all endpoint (404 resource not found)
server.use("*", (req, res) => {
  res.status(404).json({ message: "Not found!" });
});

// 6- LISTEN FOR INCOMING REQUESTS
server.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
