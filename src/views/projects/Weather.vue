<script setup lang="ts">
import { useFavicon, useTitle } from "@vueuse/core";

useTitle("Computer Science - Weather");
useFavicon(
  "https://firebasestorage.googleapis.com/v0/b/comp-sci-site.appspot.com/o/public%2Ffavicons%2Fweather.ico?alt=media&token=42f105ee-c627-42a8-bffc-df6c5ea90114"
);
const main = document.querySelector("main");
// @ts-ignore
main.style.backgroundImage =
  "url('https://wallup.net/wp-content/uploads/2016/07/19/11708-artwork-sky-clouds.jpg')";
</script>

<template>
  <v-container align="center" v-if="data.main != null" grid-list-xs>
    <v-card color="rgb(0, 0, 0, 0.5)" class="text-white border-2" width="500">
      <v-card-title>
        <h1 className="display-1">{{ data.name }}, {{ data.sys.country }}</h1>
      </v-card-title>
      <v-card-subtitle>
        <span>lat: {{ data.coord.lat }}, </span>
        <span>lon: {{ data.coord.lon }} </span>
      </v-card-subtitle>
      <v-container>
        <v-row>
          <v-col>
            <v-card color="rgb(0, 0, 0, 0.4)" class="text-white ma-4">
              <v-card-title>
                <v-icon class="mr-2">mdi-clock-outline</v-icon>
                <span className="headline"> {{ currentTime() }}</span>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card color="rgb(0, 0, 0, 0.4)" class="text-white ma-4">
              <v-container align="start">
                <v-row>
                  <v-col>
                    <v-icon>mdi-thermometer</v-icon>
                    <span className="headline"> Heat</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-icon class="mr-1">mdi-circle-medium</v-icon>
                    <span class="text-purple-lighten-1">Temperature: </span>
                    <span> {{ data.main.temp }}&deg;C</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-icon class="mr-1">mdi-circle-medium</v-icon>
                    <span class="text-purple-lighten-1">Feels Like: </span>
                    <span> {{ data.main.feels_like }}&deg;C</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-icon class="mr-1">mdi-circle-medium</v-icon>
                    <span class="text-purple-lighten-1">Min: </span>
                    <span> {{ data.main.temp_min }}&deg;C</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-icon class="mr-1">mdi-circle-medium</v-icon>
                    <span class="text-purple-lighten-1">Max: </span>
                    <span> {{ data.main.temp_max }}&deg;C</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-icon class="mr-1">mdi-circle-medium</v-icon>
                    <span class="text-purple-lighten-1">Humidity: </span>
                    <span>
                      {{ data.main.humidity }}% <v-icon>mdi-water</v-icon></span
                    >
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-icon class="mr-1">mdi-circle-medium</v-icon>
                    <span class="text-purple-lighten-1">Pressure: </span>
                    <span> {{ data.main.pressure }} hPa</span>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
          <v-col>
            <v-card color="rgb(0, 0, 0, 0.4)" class="text-white ma-4">
              <v-container align="start">
                <v-row>
                  <v-col>
                    <v-card-title>
                      <v-icon>mdi-weather-windy</v-icon>
                      <span className="headline"> Wind</span>
                    </v-card-title>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-icon class="mr-1">mdi-circle-medium</v-icon>
                    <span class="text-purple-lighten-1">Speed: </span>
                    <span> {{ data.wind.speed }}m/s</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-icon class="mr-1">mdi-circle-medium</v-icon>
                    <span class="text-purple-lighten-1">Direction: </span>
                    <span> {{ data.wind.deg }}&deg;</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-icon class="mr-1">mdi-circle-medium</v-icon>
                    <span class="text-purple-lighten-1">Gust: </span>
                    <span> {{ data.wind.gust }}m/s</span>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="(data.snow && data.rain) != null">
            <v-card color="rgb(0, 0, 0, 0.4)" class="text-white ma-4">
              <v-container align="start">
                <v-row>
                  <v-col>
                    <v-card-title>
                      <v-icon>mdi-weather-pouring</v-icon>
                      <span className="headline"> Rain</span>
                    </v-card-title>
                  </v-col>
                </v-row>
                <v-row v-if="data.rain != null">
                  <v-col>
                    <v-icon class="mr-1">mdi-circle-medium</v-icon>
                    <span class="text-purple-lighten-1">Rain: </span>
                    <span> {{ data.rain["1h"] }}mm</span>
                  </v-col>
                </v-row>
                <v-row v-if="data.snow != null">
                  <v-col>
                    <v-icon class="mr-1">mdi-circle-medium</v-icon>
                    <span class="text-purple-lighten-1">Snow: </span>
                    <span> {{ data.snow["1h"] }}mm</span>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
          <v-col>
            <v-card color="rgb(0, 0, 0, 0.4)" class="text-white ma-4">
              <v-container align="start">
                <v-row>
                  <v-col>
                    <v-card-title>
                      <v-icon>mdi-weather-fog</v-icon>
                      <span className="headline"> Clouds</span>
                    </v-card-title>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-icon class="mr-1">mdi-circle-medium</v-icon>
                    <span class="text-purple-lighten-1">Cloudiness: </span>
                    <span> {{ data.clouds.all }}%</span>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card color="rgb(0, 0, 0, 0.4)" class="text-white ma-4">
              <v-container align="start">
                <v-row>
                  <v-col>
                    <v-card-title>
                      <v-icon>mdi-weather-sunny</v-icon>
                      <span className="headline"> Sun</span>
                    </v-card-title>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-icon class="mr-1">mdi-circle-medium</v-icon>
                    <span class="text-purple-lighten-1">Sunrise: </span>
                    <br />
                    <span> {{ convertFromUTC(data.sys.sunrise) }}</span>
                  </v-col>
                  <v-col>
                    <v-icon class="mr-1">mdi-circle-medium</v-icon>
                    <span class="text-purple-lighten-1">Sunset: </span>
                    <br />
                    <span> {{ convertFromUTC(data.sys.sunset) }}</span>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Timestamp } from "@firebase/firestore";
import { defineComponent } from "vue";

interface Weather {
  coord: {
    lat: number;
    lon: number;
  };
  weather: [
    {
      description: string;
      icon: string;
      id: number;
      main: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    seaLevel: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
  clouds: {
    all: number;
  };
  rain: {
    "1h": number;
    "3h": number;
  };
  snow: {
    "1h": number;
    "3h": number;
  };
  dt: Timestamp;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export default defineComponent({
  name: "Weather",
  data() {
    return {
      api_key: "aece72db7cd2cb2cd0fb2b79bedc5d44",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
      data: {} as Weather,
    };
  },
  computed: {
    imgSrc() {
      if (this.data.weather != null) {
        return `https://openweathermap.org/img/w/${this.data.weather[0].icon}.png`;
      }
    },
  },
  methods: {
    getWeather() {
      this.query = "";
      this.data = {} as Weather;
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.getWeatherByCoords(latitude, longitude);
      });
    },
    getWeatherByCoords(lat: number, lon: number) {
      console.log(lat, lon);
      this.query = "";
      this.data = {} as Weather;
      fetch(
        `${this.url_base}weather?units=metric&lat=${lat}&lon=${lon}&appid=${this.api_key}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.data = data;
        });
    },
    currentTime() {
      return Timestamp.now().toDate().toLocaleString();
    },
    convertFromUTC(time: number) {
      return new Date(time * 1000).toLocaleString();
    },
  },
  created() {
    this.getWeather();
  },
});
</script>

<style lang="scss" scoped>
// make the background of the card transparent while leaving the text visible
.v-card {
  background-color: transparent;
}
</style>
