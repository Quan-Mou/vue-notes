<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
  console.log("组件挂载了");
});
</script>
<template>
  <!-- <h3>Home页面</h3> -->
  <!-- <router-link to="/about">Go to About</router-link>
  <router-link to="/article">Go to Article</router-link> -->

  <ul>
    <li>
      <router-link to="/users/eduardo/posts/1"
        >/users/eduardo/posts/1</router-link
      >
    </li>
    <li>
      <router-link to="/users/eduardo/posts/20"
        >/users/eduardo/posts/20</router-link
      >
    </li>
  </ul>
</template>
<style scope></style>
