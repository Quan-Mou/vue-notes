<script setup>
import Demo from "./components/my-demo/Demo.vue";
import bindStyleAndClass from "./components/my-demo/BindStyleAndClass.vue";
import conditionRander from "./components/my-demo/ConditionRander.vue";
import Temp from "./components/my-demo/Temp.vue";
import Event from "./components/my-demo/Event.vue";
import Lifecycle from "./components/my-demo/Lifecycle.vue";
import TemplateQuote from "./components/my-demo/TemplateQuote.vue";
import Home from "./views/home/index.vue";

import { reactive } from "vue";

const list = reactive([{ msg: "haha" }, { msg: "hehe" }, { msg: "heihei" }]);
</script>

<template>
  <div>
    <div>12</div>
    <Demo />
    <bind-style-and-class class="wrapper2" />
    <condition-rander />
    <Temp v-for="item in list" :msg="item.msg" />
    <Event />
    <Lifecycle />
    <TemplateQuote />
    <Home />
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
