<template>
  <div class="grid">
    <div id="container">
      <h3 id="message" v-if="!loggedIn">log in to use this app</h3>
      <div v-if="loggedIn">
        <div class="flex-container input">
          <input
            :class="{ error: hasError }"
            v-model="newItem"
            @keyup.enter="addItem(newItem)"
            placeholder="Edit me"
          />

          <button class="btn" id="add-btn" @click="addItem(newItem)">
            <i class="fa fa-plus icon" aria-hidden="true"></i>
          </button>
        </div>
        <div class="flex-container tasks">
          <div class="todo" v-for="item in ToDos" :key="item">
            <input
              type="checkbox"
              name="completed"
              @click="completeItem(item)"
              :checked="item.completed"
            />
            <p :class="{ completed: item.completed }">
              {{ item.text }}
            </p>
            <button class="delete btn" @click="deleteItem(item)">
              Delete <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
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
  data() {
    return {
      newItem: "",
      ToDos: [],
      completed: false,
      hasError: false,
      loggedIn: false,
    };
  },
  beforeCreate: function () {
    document.body.className = "todo";
  },
  methods: {
    async init(user) {
      const docRef = doc(db, `users/${user}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if (docSnap.data().todo) {
          this.ToDos = docSnap.data().todo;
        } else {
          await updateDoc(docRef, {
            todo: [],
          });
        }
      } else {
        await setDoc(docRef, {
          todo: [],
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
            todo: arrayUnion(input),
          });
          this.hasError = false;
        } else if (item == "") {
          this.hasError = true;
        }
      }
      this.newItem = "";
    },
    async deleteItem(item) {
      const docRef = doc(db, `users/${auth.currentUser?.uid}`);

      await updateDoc(docRef, {
        todo: arrayRemove(item),
      });
    },
    async completeItem(item) {
      const docRef = doc(db, `users/${auth.currentUser?.uid}`);
      let temp = [...this.ToDos];
      let index = temp.indexOf(item);
      temp[index].completed = !temp[index].completed;
      await updateDoc(docRef, {
        todo: temp,
      });
    },
    async deleteAllItems() {
      const docRef = doc(db, `users/${auth.currentUser?.uid}`);
      await updateDoc(docRef, {
        todo: [],
      });
    },
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
        this.init(user.uid);
        onSnapshot(doc(db, `users/${user.uid}`), (doc) => {
          try {
            this.ToDos = [...doc.data().todo];
          } catch {}
        });
      } else {
        this.loggedIn = false;
        this.ToDos = [];
      }
    });
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  place-items: center;
  margin-top: 30px;
  padding: 10px;
}
.flex-container {
  display: flex;
  max-width: 720px;
}
.flex-child {
  flex: 1;
  border: 2px;
}

.flex-child:first-child {
  margin-right: 20px;
}

p {
  font-size: 15px;
}

#container {
  padding: 30px;
  background-color: rgb(61, 105, 201);
  border-radius: 10px;
  min-width: 300px;
}

#add-btn {
  background-color: rgb(16, 214, 105);
  border: 5px;
  border-radius: 0 5px 5px 0;
  padding: 10px;
}

#add-btn:hover {
  background-color: rgb(21, 241, 120);
}

.btn {
  color: white;
  border: none;
  padding: 3px;
  font-size: 11px;
  outline: none;
  border-radius: 5px;
}

input {
  border: none;
  padding: 10px 29px;
  font-size: 15px;
  outline: none;
  border-radius: 5px 0 0 5px;
}

.input {
  padding: 10px 10px;
}

.tasks {
  display: flex;
  flex-direction: column;
}
.todo {
  display: flex;
  background-color: white;
  margin-bottom: 10px;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
}

.delete {
  background-color: red;
}

.delete:hover {
  background-color: rgb(255, 83, 83);
}

.completed {
  color: rgb(150, 150, 150);
  text-decoration: line-through;
}

input.error {
  color: red;
  border-color: red;
  border: 1px;
  border-style: solid;
}

.error::placeholder {
  color: red;
}
</style>
