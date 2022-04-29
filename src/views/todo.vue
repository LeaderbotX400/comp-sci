<template>
  <div id="container">
    <div class="flex-container input">
      <input
        :class="{ error: hasError }"
        v-model="newItem"
        placeholder="Edit me"
      />

      <button class="btn" id="add-btn" @click="addItem(newItem)">
        Add Task <i class="fa fa-plus icon" aria-hidden="true"></i>
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
    <button @click="deleteAllItems">Remove All</button>
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
          await setDoc(docRef, {
            todo: [],
          });
        }
      } else {
        await setDoc(docRef, {
          todo: [],
        });
      }
      console.log(this.ToDos);
    },
    async addItem(item) {
      const docRef = doc(db, `users/${auth.currentUser?.uid}`);
      let input = {
        text: item,
        completed: false,
      };
      if (item !== "") {
        await updateDoc(docRef, {
          todo: arrayUnion(input),
        });
        this.ToDos.push(input);
      } else {
        this.hasError = true;
      }
    },
    async deleteItem(item) {
      const docRef = doc(db, `users/${auth.currentUser?.uid}`);

      await updateDoc(docRef, {
        todo: arrayRemove(item),
      });

      let index = this.ToDos.indexOf(item);
      if (this.ToDos.indexOf(item) !== -1) {
        this.ToDos.splice(index, 1);
      }
    },
    async completeItem(item) {
      const docRef = doc(db, `users/${auth.currentUser?.uid}`);
      await updateDoc(docRef, {
        todo: [
          {
            completed: !item.completed,
            text: item.text,
          },
        ],
      });
    },
    async deleteAllItems() {
      const docRef = doc(db, `users/${auth.currentUser?.uid}`);
      await updateDoc(docRef, {
        todo: [],
      });
      this.ToDos = [];
    },
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.init(user.uid);
      } else {
        this.ToDos = [];
      }
    });
    const unsub = onSnapshot(
      doc(db, `users/${auth.currentUser?.uid}`),
      (doc) => {
        console.log("Current data: ", doc.data());
      }
    );
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .flex-container {
    display: flex;
    max-width: 720px;
  }
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
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 30px;
  background-color: rgb(61, 105, 201);
  border-radius: 10px;
}

#add-btn {
  background-color: rgb(16, 214, 105);
  border: 5px;
  border-radius: 0 5px 5px 0;
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
  padding: 10px 30px;
  font-size: 15px;
  outline: none;
  border-radius: 5px 0 0 5px;
}

.input {
  padding: 10px 10px;
  border-radius: 10px;
}

.tasks {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.todo {
  display: flex;
  background-color: white;
  margin-bottom: 10px;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  width: 290px;
  border-radius: 10px;
}

.delete {
  background-color: red;
}

.delete:hover {
  background-color: rgb(255, 83, 83);
}

.edit {
  background-color: green;
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

.error,
::placeholder {
  color: red;
}
</style>
