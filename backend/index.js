import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

app.get("/api/interviews", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM interviews ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/interviews", async (req, res) => {
  const { summary, transcript, helpful, materials, concerns, openFollowUp } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO interviews (summary, transcript, helpful, materials, concerns, openFollowUp) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [summary, transcript, helpful, materials, concerns, openFollowUp]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
