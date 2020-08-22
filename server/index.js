const express = require("express");
const port = process.env.PORT || 4000;

const helmet = require("helmet"); // creates headers that protect from attacks (security)
const cors = require("cors"); // allows/disallows cross-site communication
const corsOptions = require("./corsOptions");
// const morgan = require("morgan"); // logs requests, use "tiny" or "combined"

// instantiate app
const app = express();

// Define middleware here
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
// app.use(morgan("combined"));

// graphQL
const SERVER = require("./graphql/index");
SERVER.applyMiddleware({
  app: app,
  path: "/graphql",
});

// NODE_ENV is a heroku config... this if statement will consolidate the client and server for Heroku
// if (process.env.NODE_ENV === "production") {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, "./client/build")));
//   // Handle React routing, return all requests to React app
//   app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "./client/build", "index.html"));
//   });
// }

app.listen(port, () =>
  console.log(`Listening on port ${port}... see ${port}/graphql for debugging`)
);
