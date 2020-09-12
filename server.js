// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Table Seats(DATA)
// =============================================================
const reservations = [
  {
    customerName: "test",
    phoneNumber: "test",
    customerEmail: "test",
    customerID: "test",
  },
];

// Wait List(DATA)
// =============================================================
const waitlists = [
  {
    customerName: "test",
    phoneNumber: "test",
    customerEmail: "test",
    customerID: "test",
  },
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html")); // homepage
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html")); //add reservations
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html")); //for the waitlist
});

// Displays the reservations, or returns false
app.get("/api/tables/:table", function (req, res) {
  var table = req.params.reservations;

  console.log(table);

  for (var i = 0; i < reservations.length; i++) {
    if (table === reservations[i].customerName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

// Displays the waitlist, or returns false
app.get("/api/reserve/:reserve", function (req, res) {
  var lista = req.params.waitlists;

  console.log(lista);

  for (var i = 0; i < waitlists.length; i++) {
    if (lista === waitlists[i].customerName) {
      return res.json(waitlists[i]);
    }
  }

  return res.json(false);
});

// Create New reservation - takes in JSON input
app.post("/api/table", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTable = req.body;

  // Using a RegEx Pattern to remove spaces from newTable
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newTable.customerName = newTable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newTable);

  reservations.push(newTable);

  res.json(newTable);
});

// Create New reservation - takes in JSON input
app.post("/api/table", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTable = req.body;

  // Using a RegEx Pattern to remove spaces from newTable
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newTable.customerName = newTable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newTable);

  reservations.push(newTable);

  res.json(newTable);
});

// Create New waitlist - takes in JSON input
app.post("/api/reserve", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newReservatio
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.customerName = newReservation.name
    .replace(/\s+/g, "")
    .toLowerCase();

  console.log(newReservation);

  waitlists.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
