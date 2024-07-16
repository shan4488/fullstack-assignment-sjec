# Retrieve Data from AccuWeather Using Node.js

 **Problem Statement:** Create a website which reports the weather for a specific city using NodeJS to send API requests to Accuweather, use pug and CSS to present the weather to the users

### Step 1: Set Up Node.js Environment
#### 1.	Initialize a Node.js Project:

```
mkdir weather-app
cd weather-app 
npm init –y
```

#### 2. Install Required Packages:
```
npm install express axios dotenv pug
```

###  Step 2: Set Up AccuWeather API

1.	Sign Up for AccuWeather API: Create an account on AccuWeather.
2. Goto MyApps option at the top navbar and create an application clicking on `Add New App`. Copy your API Key from there.
3.	Create a .env File: Store your API key in a .env file.
ACCUWEATHER_API_KEY=your_api_key_here
- FYI (Not Mandatory)-AccuWeather CurrentCondition API Test Endpoint: https://developer.accuweather.com/accuweather-current-conditions-api/apis/get/currentconditions/v1/%7BlocationKey%7D

### Step 3: Create Server-Side Code

1.	Create server.js: This file will contain the Express server setup, API request logic, and Pug template rendering.

```
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

```

### Step 4: Create Pug Template

1. Create a folder with name `views` inside your base directory `weather-app`. 
2. Create files with the name `index.pug` and `style.css`.

#### index.pug
```
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport" content="width=device-width, initial-scale=1.0")
    title Weather App
    link(rel="stylesheet", href="/styles.css")
  body
    h1 Weather in #{city}
    if weather
      p Temperature: #{weather.Temperature.Metric.Value} °C
      p Weather: #{weather.WeatherText}
      //- p Local Obeservation Time: #{weather.LocalObservationDateTime} // Just check the payload using the Accuweather Application to get the params to query
    else
      p No weather data available
```

#### style.css

```
body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    background: #f0f0f0;
}

h1 {
    color: #333;
}

p {
    background: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
```

### Step 6: Run Your Application

Goto terminal and navigate to your base directory where the `server.js` file is present. (Use `cd weather-app` command)

```
node server.js
```


*Please work on improving the UI and experiment with additional APIs from AccuWeather to gain a comprehensive understanding of the workflow in Node.js. This example is intended as an introduction to making API calls.*


