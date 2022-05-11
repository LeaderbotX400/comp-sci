<template>
  <div class="view chat">
    <header>
      <h1>Welcome, {{ user.displayName }}</h1>
      <div class="nav">
        <div class="btn-grid">
          <button class="room" @click="showRoomGen = !showRoomGen">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
          <div
            class="room"
            @click="changeRoom(room)"
            v-for="room in rooms"
            :key="room"
          >
            {{ room.name }}
            <button
              class="delete-btn"
              @click="deleteRoom(room)"
              v-if="currentRoom.id == room.id"
            >
              <i class="fa fa-trash" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div class="btn-grid roomGen" v-if="showRoomGen">
          <input
            v-model="newRoom"
            type="text"
            class="textbox"
            placeholder="Enter Room Name"
          />
          <button class="room" @click="generateRoom(newRoom)">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </header>
    <section class="chat-box">
      <h3 v-if="currentRoom.id == null">Please select a room</h3>
      <div class="welcome">
        <h3 v-if="currentRoom.id != null">Welcome to {{ currentRoom.name }}</h3>
      </div>
      <div
        v-for="message in messages"
        :key="message"
        :class="
          message.owner == user.displayName ? 'message current-user' : 'message'
        "
      >
        <div class="message-inner">
          <div class="username">{{ message.owner }}</div>
          <div class="content">{{ message.text }}</div>
        </div>
      </div>
    </section>
    <footer v-if="currentRoom.id != null">
      <form @submit.prevent="addItem(newItem)">
        <input type="text" v-model="newItem" placeholder="Write a message..." />
        <input type="submit" value="Send" />
      </form>
      <button @click="showAddUser = true" v-if="!showAddUser">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </button>
      <form @submit.prevent="addUser(newUser)" v-if="showAddUser">
        <input
          type="text"
          v-model="newUser"
          placeholder="Enter user email..."
        />
        <input type="submit" value="Add User" />
      </form>
    </footer>
  </div>
</template>

<script>
import { auth, db } from "../firebase";
import {
  doc,
  query,
  where,
  getDoc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  arrayUnion,
  collection,
  onSnapshot,
} from "firebase/firestore";
export default {
  beforeCreate: function () {
    document.body.className = "chat";
  },
  data() {
    return {
      user: {},
      rooms: [],
      newRoom: "",
      newItem: "",
      newUser: "",
      messages: [],
      currentRoom: {},
      showRoomGen: "",
      showAddUser: false,
    };
  },
  methods: {
    async init() {
      const q = query(
        collection(db, "rooms"),
        where("users", "array-contains", auth.currentUser?.uid)
      );
      onSnapshot(q, (snapshot) => {
        this.rooms = [];
        snapshot.forEach((doc) => {
          this.rooms.push({
            id: doc.id,
            name: doc.data().name,
          });
        });
      });
    },
    async addItem(item) {
      const docRef = doc(db, `rooms/${this.currentRoom.id}`);
      let input = {
        id: Math.random(),
        text: item,
        owner: auth.currentUser.displayName,
      };
      if (item !== "") {
        await updateDoc(docRef, {
          chat: arrayUnion(input),
        });
      }
      this.newItem = "";
    },
    async generateRoom(newRoom) {
      await addDoc(collection(db, "rooms"), {
        name: newRoom,
        chat: [],
        users: [auth.currentUser?.uid],
      });
      this.newRoom = "";
      this.showRoomGen = false;
    },
    async changeRoom(room) {
      if (room == "home") {
        this.messages = {};
        this.currentRoom = {};
      } else {
        this.currentRoom = {
          id: room.id,
          name: room.name,
        };
        const docRef = doc(db, `rooms/${room.id}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          if (docSnap.data().chat) {
            onSnapshot(doc(db, `rooms/${room.id}`), (doc) => {
              try {
                this.messages = [...doc.data().chat];
              } catch {}
            });
          }
        }
      }
    },
    async addUser(user) {
      const docRef = doc(db, `rooms/${this.currentRoom.id}`);
      const qa = query(
        collection(db, "users"),
        where("info.email", "==", user)
      );
      const qsnap = await getDocs(qa);
      qsnap.forEach(async (doc) => {
        await updateDoc(docRef, {
          users: arrayUnion(doc.id),
        });
        console.log(doc.id, "=>", doc.data());
      });
      this.newUser = "";
      this.showAddUser = false;
    },
    async deleteRoom(room) {
      await deleteDoc(doc(db, "rooms", room.id));
      this.messages = null;
    },
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = {
          displayName: user.displayName,
        };
        this.init();
      } else {
        this.name = null;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.view {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #ea526f;
  .nav {
    .roomGen {
      height: 46px;
      .textbox {
        border: none;
        border-radius: 4px;
        margin: 3px 3px -2px;
        padding: 0px 16px;
        -webkit-box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14),
          0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2);
        box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14),
          0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2);
      }
    }
    .btn-grid {
      display: flex;
      margin: 8px;
      padding: 4px;
      border: none;
      .room {
        margin-top: -2px;
        margin: 3px;
        margin-bottom: -2px;
        -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        border: none;
        border-radius: 2px;
        display: inline-block;
        height: 36px;
        line-height: 36px;
        padding: 0 16px;
        text-transform: uppercase;
        vertical-align: middle;
        -webkit-tap-highlight-color: transparent;
        text-decoration: none;
        color: #fff;
        background-color: #26a69a;
        text-align: center;
        letter-spacing: 0.5px;
        -webkit-transition: background-color 0.2s ease-out;
        transition: background-color 0.2s ease-out;
        cursor: pointer;
      }
      .room:hover {
        background-color: #2bbbad;
        -webkit-box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14),
          0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2);
        box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14),
          0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2);
      }
      .delete-btn {
        color: white;
        border: none;
        background-color: transparent;
        padding-left: 10px;
        text-decoration: none;
        :hover {
          color: red;
        }
      }
    }
  }
  &.chat {
    flex-direction: column;
    header {
      position: relative;
      display: block;
      width: 100%;
      padding: 50px 30px 10px;
      .logout {
        position: absolute;
        top: 15px;
        right: 15px;
        appearance: none;
        border: none;
        outline: none;
        background: none;
        color: #fff;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: right;
      }
      h1 {
        color: #fff;
      }
    }
    .chat-box {
      border-radius: 24px 24px 0px 0px;
      background-color: #fff;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      flex: 1 1 100%;
      padding: 30px;
      .message {
        display: flex;
        margin-bottom: 15px;
        .message-inner {
          .username {
            color: #888;
            font-size: 16px;
            margin-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
          }
          .content {
            display: inline-block;
            padding: 10px 20px;
            background-color: #f3f3f3;
            border-radius: 999px;
            color: #333;
            font-size: 18px;
            line-height: 1.2em;
            text-align: left;
          }
        }
        &.current-user {
          margin-top: 30px;
          justify-content: flex-end;
          text-align: right;
          .message-inner {
            max-width: 75%;
            .content {
              color: #fff;
              font-weight: 600;
              background-color: #ea526f;
            }
          }
        }
      }
      .welcome {
        display: flex;
        justify-content: center;
        h3 {
          color: lightgray;
        }
      }
    }
    footer {
      position: sticky;
      bottom: 0px;
      background-color: #fff;
      padding: 30px;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      form {
        display: flex;
        input[type="text"] {
          flex: 1 1 100%;
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px 0px 0px 8px;
          color: #333;
          font-size: 18px;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #f3f3f3;
          transition: 0.4s;
          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }
        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          padding: 10px 15px;
          border-radius: 0px 8px 8px 0px;
          background-color: #ea526f;
          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
