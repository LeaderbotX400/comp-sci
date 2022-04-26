<template>
  <div id="container">
    <button @click="addToDo">Click Me!</button>
  </div>
</template>

<script>
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default {
  // data() {
  //   return {
  //     uid: auth.currentUser?.uid,
  //   };
  // },
  beforeCreate: function () {
    document.body.className = "todo";
  },
  computed: {
    user: function () {
      //console.log(auth.currentUser?.uid);
      return auth.currentUser?.uid;
    },
  },
  watch: {
    user: function (newUser) {
      if (newUser) {
        this.init();
      }
    },
  },
  methods: {
    //remove watch and compute
    async init(user) {
      console.log("ran init function");
      const docRef = doc(db, `users/${user}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().todo);
      } else {
        console.log("No such document!");
      }
    },
    async addToDo() {
      await updateDoc(docRef, {
        todo: arrayUnion("test"),
      });
    },
    async removeToDo() {},
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.init(user.uid);
      } else {
        this.todos = [];
      }
    });
  },
};
</script>
