<script setup>
import { ref } from "vue";

const emit = defineEmits(["propEm", "getValue"]);

const message = ref("");

function btn(event) {
  console.log(event);
  console.log("只会执行一次");
}

function inputFn() {
  console.log("点击了enter键");
}
</script>

<template>
  <div>
    <button v-on:click.once="btn($event)">按钮</button>
    <input @keyup.enter="inputFn" />
    <input v-model="message" type="text" placeholder="请输入" />
    <div>{{ message }}</div>
    <button
      @click="emit('getValue', 'QuanMou', 18)"
      style="color: pink"
    ></button>

    <button @click="emit('propEm', true)" style="color: pink">
      点击使用defineEmit触发的事件
    </button>
  </div>
</template>

<style scoped></style>
