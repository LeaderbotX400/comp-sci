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
      <span class="navbar" v-for="room in rooms" :key="room">
        <button class="btn">{{ room.name }}</button>
      </span>
      <div class="card">
        <div class="card-body">
          <div
            class="border pl-2 pt-1 ml-2 message-text mb-2"
            v-for="message in messages"
            :key="message"
          >
            <span class="mg-text">{{ message.owner }}</span>
            <p class="message pt-1">{{ message.text }}</p>
          </div>
        </div>
      </div>
      <div id="text">
        <input v-model="roomName" type="text" class="mt-3 mr-2 pl-2 pr-2" />
        <button class="btn btn-primary" @click="generateRoom(roomName)">
          Generate Room
        </button>
      </div>

      <div id="text">
        <input v-model="showMessage" type="text" class="mt-3 mr-2 pl-2 pr-2" />
        <button class="btn btn-primary" @click="addItem(showMessage)">
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../firebase";
// import { v4 as uuidv4 } from "uuid";
import {
  doc,
  query,
  getDocs,
  updateDoc,
  arrayUnion,
  addDoc,
  collection,
  arrayRemove,
  onSnapshot,
  where,
} from "firebase/firestore";
export default {
  beforeCreate: function () {
    document.body.className = "chat";
  },

  data() {
    return {
      name: null,
      showMessage: "",
      roomName: "",
      rooms: [],
      currentRoom: "",
      messages: [],
    };
  },
  methods: {
    async init() {
      const q = query(
        collection(db, "rooms"),
        where("users", "array-contains", auth.currentUser?.uid)
      );
      // const querySnapshotRef = await getDocs(q);
      onSnapshot(q, (snapshot) => {
        this.rooms = [];
        snapshot.forEach((doc) => {
          this.rooms.push({
            id: doc.id,
            name: doc.data().name,
          });
          console.log(doc.id, " => ", doc.data());
        });
        console.log(this.rooms);
      });
    },
    async addItem(item) {
      const docRef = doc(db, `rooms/ql54P0Dk8CUYo3kN7KTF`);
      let input = {
        id: Math.random(),
        text: item,
        owner: auth.currentUser?.displayName,
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
    async generateRoom(roomName) {
      await addDoc(collection(db, "rooms"), {
        name: roomName,
        chat: [],
        users: [auth.currentUser?.uid],
      });
      this.roomName = "";
    },
    async changeRooms(roomName) {},
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.name = user.displayName;
        this.init();
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
.navbar {
  overflow: scroll;
  justify-content: space-between;
}

#container {
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
