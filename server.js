const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const port = 3000;

const ACCUWEATHER_API_KEY = process.env.ACCUWEATHER_API_KEY;
const CITY = "Bengaluru"; // Replace with the desired city
const LOCATION_KEY = "204108"; // Replace with the location key of the city - I have taken bengaluru city code

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${LOCATION_KEY}`,
      {
        params: {
          apikey: ACCUWEATHER_API_KEY,
        },
      }
    );
    const weatherData = response.data[0];
    res.render("index", { city: CITY, weather: weatherData });
  } catch (error) {
    res.status(500).send("Error fetching weather data");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
