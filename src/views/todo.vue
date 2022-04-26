<template>
  <div id="container"></div>
</template>

<script>
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default {
  beforeCreate: function () {
    document.body.className = "todo";
  },
  addToDo() {
    await setDoc(doc(db, "users", auth.currentUser.uid, "todo"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    });
  },
  removeToDo() {

  },
  async mounted() {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  },
};
</script>
