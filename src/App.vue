<script setup>
<<<<<<< HEAD
import Demo from "./components/my-demo/Demo.vue";
import bindStyleAndClass from "./components/my-demo/BindStyleAndClass.vue";
import conditionRander from "./components/my-demo/ConditionRander.vue";
import Temp from "./components/my-demo/Temp.vue";
import Event from "./components/my-demo/Event.vue";
import Lifecycle from "./components/my-demo/Lifecycle.vue";
import TemplateQuote from "./components/my-demo/TemplateQuote.vue";
import Home from "./views/home/index.vue";
=======
import Demo from './components/my-demo/Demo.vue'
import bindStyleAndClass from './components/my-demo/BindStyleAndClass.vue'
import conditionRander from './components/my-demo/ConditionRander.vue'
import Temp from './components/my-demo/Temp.vue'
import Event from "./components/my-demo/Event.vue"
import Lifecycle from './components/my-demo/Lifecycle.vue'
import TemplateQuote from "./components/my-demo/TemplateQuote.vue"
import BlogPost from "./components/my-demo/BlogPost.vue"



  import {reactive,ref} from "vue"

  const list = reactive([
    {msg:"haha"},
    {msg:"hehe"},
    {msg:"heihei"}
  ])
>>>>>>> d531f3241b96aa721e56f0ce5718c51aecda7b0b

import { reactive } from "vue";

<<<<<<< HEAD
const list = reactive([{ msg: "haha" }, { msg: "hehe" }, { msg: "heihei" }]);
=======
  const posts = ref([
    { id: 1, title: 'My journey with Vue' },
    { id: 2, title: 'Blogging with Vue' },
    { id: 3, title: 'Why Vue is so fun' }
  ])

  const postSize = ref(1)

>>>>>>> d531f3241b96aa721e56f0ce5718c51aecda7b0b
</script>

<template>
  <div>
    <div>12</div>
<<<<<<< HEAD
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
=======
    <Demo/>
    <bind-style-and-class class="wrapper2"/>
    <condition-rander/>
    <Temp v-for="item in list" :msg="item.msg"/>
    <Event/>
    <Lifecycle title="{name:'SpringBoot常用starter'}"/>
    <TemplateQuote :user.prop="{name:'Quan'}" />
    <div :style="{fontSize:postSize + 'em'}">
      <BlogPost v-for="item in posts" :key="item.id" :title="item.title" @enlarge-text="postSize += 0.2"/>
    </div>
    <BlogPost>
        slot插槽传入
    </BlogPost>
  </div>  
>>>>>>> d531f3241b96aa721e56f0ce5718c51aecda7b0b
</template>

<style scoped></style>
