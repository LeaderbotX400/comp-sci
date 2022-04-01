<template>
  <!-- <link rel="stylesheet" href="/assets/weather/font/Rimouski.css" /> -->
  <div class="weather">
    <div class="app-title">
      <p>Weather</p>
    </div>
    <div class="notification">{{ notificationElement }}</div>
    <div class="weather-container">
      <div class="weather-icon">
        <img v-bind:src="iconElement" alt="" />
      </div>
      <div class="temperature-value">
        <p @click="changeUnit()">{{ tempElement }}</p>
      </div>
      <div class="temperature-description">
        <p>{{ descElement }}</p>
      </div>
      <div class="location">
        <p>{{ locationElement }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const key = "82005d27a116c2880c8f0fcb866998a0";
const KELVIN = 273;
const weather = {};
weather.temperature = {
  unit: "celsius",
};

export default {
  beforeCreate: function () {
    document.body.className = "weather";
  },
  data() {
    return {
      notificationElement: "",
      iconElement: "/assets/weather/icons/unknown.png",
      tempElement: "- °C",
      descElement: "-",
      locationElement: "-",
    };
  },
  methods: {
    // SET USER'S POSITION
    setPosition(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      this.getWeather(latitude, longitude);
    },

    // SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
    showError(error) {
      this.notificationElement.style.display = "block";
      this.notificationElement = `<p> ${error.message} </p>`;
    },

    // GET WEATHER FROM API PROVIDER
    getWeather(latitude, longitude) {
      console.log(`${latitude} ${longitude}`);
      let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

      fetch(api)
        .then((response) => {
          let data = response.json();
          return data;
        })
        .then((data) => {
          weather.temperature.value = Math.floor(data.main.temp - KELVIN);
          weather.description = data.weather[0].description;
          weather.iconId = data.weather[0].icon;
          weather.city = data.name;
          weather.country = data.sys.country;
        })
        .then(() => {
          this.displayWeather();
        });
    },

    // DISPLAY WEATHER TO UI
    displayWeather() {
      this.iconElement = `/assets/weather/icons/${weather.iconId}.png`;
      this.tempElement = `${weather.temperature.value}°C`;
      this.descElement = weather.description;
      this.locationElement = `${weather.city}, ${weather.country}`;
    },

    // C to F conversion
    celsiusToFahrenheit(temperature) {
      return (temperature * 9) / 5 + 32;
    },

    // CHANGE UNITS
    changeUnit() {
      if (weather.temperature.value === undefined) return;

      if (weather.temperature.unit == "celsius") {
        let fahrenheit = this.celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        this.tempElement = `${fahrenheit}°F`;
        weather.temperature.unit = "fahrenheit";
      } else {
        this.tempElement = `${weather.temperature.value}°C`;
        weather.temperature.unit = "celsius";
      }
    },
  },
  mounted() {
    let css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "/assets/weather/font/Rimouski.css";
    document.head.appendChild(css);

    let link = document.querySelector("link[rel~='icon']");
    link.href = "/favicons/weather.ico";
    document.title = "Weather";

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        this.setPosition,
        this.showError
      );
    } else {
      this.notificationElement.style.display = "block";
      this.notificationElement = "<p>Browser doesn't Support Geolocation</p>";
    }
  },
};
</script>

<style scoped>
/* @import url("/assets/weather/font/Rimouski.css"); */
* {
  font-family: "Rimouski";
}

.weather {
  width: 300px;
  background-color: #fff;

  display: block;
  margin: 0 auto;

  border-radius: 10px;
  padding-bottom: 50px;
}

.app-title {
  width: 300px;
  height: 50px;
  border-radius: 10px 10px 0 0;
}

.app-title p {
  text-align: center;
  padding: 15px;
  margin: 0 auto;
  font-size: 1.2em;
  color: #293251;
}

.notification {
  background-color: #f8d7da;
  display: none;
}

.notification p {
  color: #721c24;
  font-size: 1.2em;
  margin: 0;
  text-align: center;
  padding: 10px 0;
}

.weather-container {
  width: 300px;
  height: 260px;
  background-color: #f4f9ff;
}

.weather-icon {
  width: 300px;
  height: 128px;
}

.weather-icon img {
  display: block;
  margin: 0 auto;
}

.temperature-value {
  width: 300px;
  height: 60px;
}

.temperature-value p {
  padding: 0;
  margin: 0;
  color: #293251;
  font-size: 4em;
  text-align: center;
  cursor: pointer;
}

.temperature-value span {
  color: #293251;
  font-size: 0.5em;
}

.temperature-description p {
  padding: 8px;
  margin: 0;
  color: #293251;
  text-align: center;
  font-size: 1.2em;
}

.location p {
  margin: 0;
  padding: 0;
  color: #293251;
  text-align: center;
  font-size: 0.8em;
}
</style>
