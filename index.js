import express from "express";
import mysql2 from "mysql2";
import dotenv from "dotenv";

const app = express();
const PORT = 3003;
dotenv.config({ path: "./.env" });

const {HOST,DATABASE,PASSWORD,USER}= process.env;


// app.use(configDotenv());

const connection = mysql2.createConnection({
  host: HOST,
  database:DATABASE,
  user:USER,
  password: PASSWORD,
});

// Middleware for logging
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] - ${req.method} ${req.url}`);
  next(); // Move to the next middleware/route handler
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

// getRoute
app.get("/", (req, res) => {
  // res.json({
  //     message:"api using sql"
  // })
  res.send("server is live using sql");
});

// Route to fetch all data
app.get("/all", (req, res) => {
  const sql_query = "SELECT * FROM five_table";
  connection.query(sql_query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(result);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
