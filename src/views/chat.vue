<template>
  <div id="container">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
      crossorigin="anonymous"
    />
    <!-- Login section -->
    <div class="login mt-5" v-if="!name">
      <h3 class="mt-5">Please Login in to use this app</h3>
    </div>
    <!-- Chat section -->
    <div class="message-body mt-3" v-else>
      <h3>Chat</h3>
      <h5>Welcome {{ name }}!</h5>
      <div class="card">
        <div class="card-body">
          <div
            class="border pl-2 pt-1 ml-2 message-text mb-2"
            v-for="message in messages"
            :key="message"
          >
            <span class="mg-text">{{ message.name }}</span>
            <p class="message pt-1">{{ message.text }}</p>
          </div>
        </div>
      </div>
      <input v-model="showMessage" type="text" class="mt-3 mr-2 pl-2 pr-2" />
      <button class="btn btn-primary" @click="sendMessage(showMessage)">
        Send
      </button>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
export default {
  beforeCreate: function () {
    document.body.className = "chat";
  },

  data() {
    return {
      name: null,
      showMessage: "",
      messages: [],
    };
  },
  methods: {
    async init(user) {
      const docRef = doc(db, `users/${user}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if (docSnap.data().chat) {
          this.messages = docSnap.data().chat;
        } else {
          await updateDoc(docRef, {
            chat: [],
          });
        }
      } else {
        await setDoc(docRef, {
          chat: [],
        });
      }
    },
    async addItem(item) {
      const docRef = doc(db, `users/${auth.currentUser?.uid}`);
      let input = {
        text: item,
        completed: false,
      };
      if (auth.currentUser == null) {
        this.hasError = true;
      } else {
        if (item !== "") {
          await updateDoc(docRef, {
            chat: arrayUnion(input),
          });
          this.hasError = false;
        } else if (item == "") {
          this.hasError = true;
        }
      }
      this.newItem = "";
    },
    sendMessage() {
      const message = {
        text: this.showMessage,
        username: this.name,
      };

      this.showMessage = "";
    },
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.name = user.displayName;
        this.init(user.uid);
        // try {
        //   onSnapshot(doc(db, `users/${user.uid}`), (doc) => {
        //     this.ToDos = [...doc.data().chat];
        //   });
        // } catch {}
      } else {
        this.name = null;
      }
    });
    let script = document.createElement("script");
    script.id = "tempScript";
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    let css = document.createElement("link");
    css.id = "tempCSS";
    css.href =
      "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
    css.crossOrigin = "anonymous";
    document.head.appendChild(css);
  },
  unmounted() {
    let temp = document.getElementById("tempScript");
    document.head.removeChild(temp);

    temp = document.getElementById("tempCSS");
    document.head.removeChild(temp);
  },
};
</script>

<style scoped>
#app {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
}
.login {
  background: #fff;
  width: 40%;
  height: 50vh;
  margin: auto;
  padding-left: 20px;
  padding-right: 20px;
}
h3 {
  font-size: 30px;
  text-align: center;
}
input {
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgb(156, 156, 156);
  padding-left: 2px;
  padding-right: 2px;
}
.message-body {
  width: 40%;
  height: 80vh;
  margin: auto;
}
.message-text {
  min-width: 10%;
  border-radius: 4px;
}
.message {
  font-size: 14px;
}
.mg-text {
  color: rgb(0, 195, 255);
  font-weight: bolder;
}
.message-body input {
  width: 80%;
  border-radius: 4px;
  border: 1px solid rgb(156, 156, 156);
  height: 6vh;
  padding-left: 2px;
  padding-right: 2px;
}
.card {
  width: 100%;
  height: 75vh;
  margin: auto;
}
.card-body {
  min-height: 50vh;
  overflow-x: scroll;
}
</style>
