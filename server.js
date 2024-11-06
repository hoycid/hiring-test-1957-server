import { config } from "dotenv";
config();

import express from "express";
import fetch from "node-fetch";

const API_KEY = process.env.API_KEY;

const PORT = process.env.PORT || 8000;

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/domains/:id", async (req, res) => {
  const customer_id = req.params.id;

  const url = `https://api.recruitment.shq.nz/domains/${customer_id}?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `API error: ${response.statusText}`,
      });
    }

    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching domains" });
  }
});

app.get("/zones/:id", async (req, res) => {
  const zone_id = req.params.id;

  const url = `https://api.recruitment.shq.nz/zones/${zone_id}?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `API error: ${response.statusText}`,
      });
    }

    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching domains" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
