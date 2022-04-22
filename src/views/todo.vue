<template>
  <h3>hello!</h3>
</template>

<script>
import { auth } from "../firebase";
export default {
  beforeCreate: function () {
    document.body.className = "ToDo";
  },
};
</script>
