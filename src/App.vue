<script setup>
import Demo from "./components/my-demo/Demo.vue";
import bindStyleAndClass from "./components/my-demo/BindStyleAndClass.vue";
import conditionRander from "./components/my-demo/ConditionRander.vue";
import Temp from "./components/my-demo/Temp.vue";
import Event from "./components/my-demo/Event.vue";
import Lifecycle from "./components/my-demo/Lifecycle.vue";
import TemplateQuote from "./components/my-demo/TemplateQuote.vue";
import Home from "./views/home/index.vue";

import { reactive, ref } from "vue";

const list = reactive([{ msg: "haha" }, { msg: "hehe" }, { msg: "heihei" }]);
const posts = ref([
  { id: 1, title: "My journey with Vue" },
  { id: 2, title: "Blogging with Vue" },
  { id: 3, title: "Why Vue is so fun" },
]);

const postSize = ref(1);

const handlerVal = (name, age) => {
  console.log("接受到Event组件发送的事件");
  console.log(name);
  console.log(age);
};
</script>

<template>
  <Demo />
  <bind-style-and-class class="wrapper2" />
  <condition-rander />
  <Temp v-for="item in list" :msg="item.msg" />
  <Event
    @getValue="handlerVal"
    @propEm="
      (is) => {
        console.log(is);
      }
    "
  />
  <Lifecycle title="{name:'SpringBoot常用starter'}" />
  <TemplateQuote :user.prop="{ name: 'Quan' }" />
  <div :style="{ fontSize: postSize + 'em' }">
    <BlogPost
      v-for="item in posts"
      :key="item.id"
      :title="item.title"
      @enlarge-text="postSize += 0.2"
    />
  </div>
  <BlogPost> slot插槽传入 </BlogPost>
  <!-- </div>   -->
</template>

<style scoped></style>
