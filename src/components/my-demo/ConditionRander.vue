

<script setup>
import { reactive, ref } from "vue";

    const is = ref(true);
    const items = ref([{book:"瓦尔登湖",id:1},{book:"你的孤独，虽败犹荣",id:2},{book:"人生",id:3}])

    const myObj = reactive({
        name:"QuanMou",
        age:19,
        address:"NanChang"
    })

</script>

<template>
    <div  v-if="is">
        <h3>条件渲染</h3>

        <div v-show="false">v-show</div>
        <template v-for="n in 3">
            <li>{{ n }}</li>
        </template>


        <ul>
            <!-- <li v-for="item in items ">
                {{ item.book }}
            </li> -->
            <li v-for="{book},index in items ">
                {{ book }} - {{ index  }}
            </li>
        </ul>

        <ul>
            <!-- <li v-for="value in myObj">
                {{ value }}
            </li> -->
            <!-- <li v-for="(value,key) in myObj">
                {{ value }} - {{ key }}
            </li> -->
            <li v-for="(value,key,index) in myObj">
                {{ value }} - {{ key }} - {{ index }}
            </li>
        </ul>

        <ul>
            <li v-for="n in 10">{{ n }}</li>
        </ul>

        


    </div>

</template>



<style scoped>

</style>