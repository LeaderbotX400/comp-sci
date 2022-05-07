<template>
  <div class="topnav">
    <div class="grid">
      <a class="icon" @click="showMenu()">
        <i class="icon fa fa-bars" />
      </a>
      <router-link to="/" @click="reload()">
        <i class="fas fa-home" /> Home
      </router-link>
      <div class="auth">
        <button class="login" @click="showAuthMenu" v-if="!loggedIn">
          Login
        </button>
        <button class="logout" @click="logout" v-else>Logout</button>
      </div>
    </div>
    <div class="button-grid" v-if="showLinks">
      <button @click="changeFocus('games')">
        <i class="fa fa-gamepad" aria-hidden="true" /> Games
      </button>
      <button @click="changeFocus('firebase')">
        <i class="fa fa-fire" aria-hidden="true" /> Firebase
      </button>
      <button @click="changeFocus('apis')">
        <i class="fa fa-terminal" aria-hidden="true" /> API(s)
      </button>
    </div>
    <div id="links">
      <div id="games">
        <div v-if="show.games.active">
          <router-link to="/games/dragon" @click="reload()">
            RNG Dragon
          </router-link>
          <a href="/games/pokemon/index.html">Pokemon Simulator</a>
        </div>
      </div>
      <div id="apis">
        <div v-if="show.apis.active">
          <router-link to="/fetch/weather" @click="reload()"
            >weather</router-link
          >
          <router-link to="/fetch/pokedex" @click="reload()"
            >pokedex</router-link
          >
        </div>
      </div>

      <div id="firebase" v-if="show.firebase.active">
        <router-link to="/firebase/todo" @click="reload()"
          >To-Do App</router-link
        >
        <router-link to="/firebase/chat" @click="reload()"
          >Chat App</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../firebase";
import { EmailAuthProvider, GoogleAuthProvider } from "@firebase/auth";
import "firebaseui";
import { doc, setDoc, getDoc, updateDoc } from "@firebase/firestore";

export default {
  data() {
    return {
      show: {
        games: {
          active: false,
        },
        apis: {
          active: false,
        },
        firebase: {
          active: false,
        },
      },
      showLinks: false,
      showAuth: false,
      loggedIn: false,
      info: null,
    };
  },
  methods: {
    changeFocus(item) {
      let temp = this.show;
      for (let i in temp) {
        temp[i].active = false;
      }
      this.show[item].active = true;
    },
    reload() {
      for (let i in this.show) {
        this.show[i].active = false;
      }
    },
    showMenu() {
      this.showLinks = !this.showLinks;
    },
    async init(user) {
      const docRef = doc(db, `users/${user.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if (docSnap.data().info) {
          this.info = docSnap.data().info;
        } else {
          await updateDoc(docRef, {
            info: {
              uid: user.uid,
              name: user.displayName,
              email: [user.email],
            },
          });
        }
      } else {
        await setDoc(docRef, {
          info: {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
          },
        });
      }
    },
    showAuthMenu() {
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(auth);
      }
      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            return false;
          },
        },
        signInFlow: "popup",
        signInOptions: [
          {
            provider: EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true,
          },
          {
            provider: GoogleAuthProvider.PROVIDER_ID,
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
        this.init(user);
      } else {
        this.loggedIn = false;
      }
    });
  },
};
</script>

<style scoped>
.grid {
  display: flex;
  justify-content: space-between;
}
.button-grid {
  overflow: scroll;
  display: flex;
  align-items: center;
}

/* Auth buttons */
.auth {
  display: flex;
}

button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 5px;
  font-size: 15px;
  outline: none;
}

.login:hover {
  background-color: #3399ff;
}
.logout:hover {
  background-color: #ff0000;
}

/* Style the navigation menu */
.topnav {
  overflow: hidden;
  position: relative;
  background-color: #333;
}

/* Style navigation menu links */
.topnav a {
  color: white;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  display: block;
}

/* Style the hamburger menu */
.topnav a.icon {
  background: black;
  display: block;
  /* position: absolute;
  right: 0;
  top: 0; */
}

/* Add a grey background color on mouse-over */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Style the active link (or home/logo) */
.active {
  background-color: #04aa6d;
  color: white;
}
</style>
