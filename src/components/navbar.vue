<template>
  <!-- The navigation menu -->
  <div class="navbar">
    <div class="btn-grid">
      <router-link to="/"><i class="fas fa-home"></i> Home</router-link>
      <!-- Games -->
      <div class="subnav">
        <button class="subnavbtn">
          <i class="fas fa-gamepad"></i> Games <i class="fa fa-caret-down"></i>
        </button>
        <div class="subnav-content">
          <a href="/games/pokemon/index.html">Pokemon simulator</a>
          <router-link to="/games/dragon">RNG Dragon</router-link>
        </div>
      </div>
      <!-- API based applications -->
      <div class="subnav">
        <button class="subnavbtn">
          <i class="fas fa-terminal"></i> Api(s)
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="subnav-content">
          <router-link to="/fetch/pokedex">Pokedex</router-link>
          <router-link to="/fetch/weather">Weather</router-link>
        </div>
      </div>
      <!-- Misc -->
      <div class="subnav">
        <button class="subnavbtn">
          <i class="fas fa-terminal"></i> Misc <i class="fa fa-caret-down"></i>
        </button>
        <div class="subnav-content">
          <router-link to="/misc/todo">To-Do</router-link>
        </div>
      </div>
    </div>
    <div class="auth">
      <button class="login btn" @click="showAuthMenu" v-if="!loggedIn">
        Login
      </button>
      <button class="logout btn" @click="logout" v-if="loggedIn">Logout</button>
    </div>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { onAuthStateChanged, EmailAuthProvider } from "@firebase/auth";
import "firebaseui";

export default {
  data() {
    return {
      showAuth: false,
      loggedIn: false,
    };
  },
  methods: {
    showAuthMenu() {
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(auth);
      }
      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // Handle the result
            return false;
          },
        },
        signInFlow: "popup",
        signInOptions: [
          {
            provider: EmailAuthProvider.PROVIDER_ID,
          },
        ],
      };
      ui.start("#firebaseui-auth-container", uiConfig);
    },
    logout() {
      auth.signOut();
    },
  },

  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
        const uid = user.uid;
        console.log(user.email + " is logged in!");
      } else {
        this.loggedIn = false;
        console.log("User is logged out!");
      }
    });
  },
};
</script>

<style>
.btn-grid {
  display: flex;
  align-items: center;
}

/* Auth buttons */
.auth {
  display: flex;
}
.btn {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 5px;
  /* margin: 10px; */
  font-size: 15px;
  outline: none;
}

.login:hover {
  background-color: #3399ff;
}
.logout:hover {
  background-color: #ff0000;
}

/* The navigation menu */
.navbar {
  justify-content: space-between;
  align-items: center;
  height: 46px;
  display: flex;
  overflow: hidden;
  background-color: #333;
}

/* Navigation links */
.btn-grid a {
  font-family: Arial;
  float: left;
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* The subnavigation menu */
.subnav {
  float: left;
  overflow: hidden;
}

/* Subnav button */
.subnav .subnavbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

/* Add a skyblue background color to navigation links on hover */
.btn-grid a:hover,
.subnav:hover .subnavbtn {
  background-color: skyblue;
}

/* Style the subnav content - positioned absolute */
.subnav-content {
  display: none;
  position: absolute;
  left: 0;
  background-color: skyblue;
  width: 100%;
  z-index: 1;
}

/* Style the subnav links */
.subnav-content a {
  float: left;
  color: black;
  text-decoration: none;
}

/* Add a grey background color on hover */
.subnav-content a:hover {
  background-color: #eee;
  color: black;
}

/* When you move the mouse over the subnav container, open the subnav content */
.subnav:hover .subnav-content {
  display: block;
}
</style>
