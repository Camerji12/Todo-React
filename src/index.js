import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/addCustomer", async (req, res) => {
  try {
    const { firstname, lastname, address, gender } = req.body;

    const newCustomer = await pool.query(
      "INSERT INTO kunde (vorname, nachname, adresse, geschlecht) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstname, lastname, address, gender]
    );
    res.json(newCustomer.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
