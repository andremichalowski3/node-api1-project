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
  {
    id: "1",
    name: "foo",
    bio: "bar",
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
  // if !(name && bio)
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (name && bio) {
    try {
      const newUser = { id: generate(), name, bio };
      users.push(newUser);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
    }
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
    res.status(404).json({
      message: `The user with the specified id: ${id} does not exist.`,
    });
  } else if (user) {
    res.status(200).json(user);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
});

//CRUD 3: DELETE

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  // console.log(id);
  // console.log(users);
  try {
    if (!users.find((user) => user.id === id)) {
      res.status(404).json({ message: `The user with '${id}' does not exist.` });
    } else {
      users = users.filter((user) => user.id === id);
      res
        .status(200)
        .json({ message: `The user with ${id} was deleted successfully.` });
    }
  } catch (error) {
    res.status(500).json({ message: "The user could not be removed." });
  }
});

//CRUD 4: PUT

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params
  const { name, bio } = req.body
  const indexOfUser = users.findIndex(user => user.id === id)
  // console.log(req.body)
  // console.log(indexOfUser)
  if (indexOfUser !== -1) {
    users[indexOfUser] = { id, name, bio };
    res.status(200).json({ id, name, bio });
  } else {
    res.status(404).json({ message: `No user with id '${id}'.` });
  }
});

//////////////////////////////////////////////////////////////////

// [GET, POST...] catch all endpoint (404 resource not found)
server.use("*", (req, res) => {
  res.status(404).json({ message: "Not found!" });
});

// 6- LISTEN FOR INCOMING REQUESTS
server.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
