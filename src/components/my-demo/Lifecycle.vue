<script setup>
    import {onMounted, onUpdated,ref, watch, watchEffect} from "vue"

    const msg = ref(0);
    const todoId  = ref(1);
    

    const props = defineProps(["title"])
    // defineProps(["name"])

    onMounted(() =>{
        console.log("初始渲染并DOM节点了")
        // console.log(props)
        // console.log(props.title)
    }) 

    onUpdated(() => {
        console.log("组件DOM更新后调用")
    })

    watch(msg,(newVal,oldVal) => {
        console.log(newVal);
        console.log(oldVal)
    })

    watch(todoId ,async () => {   
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
        res.json().then(data => {
            console.log(data)
        })
    },{immediate:true})

    watchEffect(async () => {
        console.log("自动追踪响应式属性")
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
        res.json().then(data => {
            console.log(data)
        })
    })






</script>
<template>
    <div>
        <h3>生命周期</h3>
        <h4 @click="todoId++">{{ todoId }}</h4>
        <h3>传递过来的值：{{title.name}} - {{ props }}</h3>
        <!-- <h3>传递过来的值：{{name}} </h3> -->
    </div>
</template>



<style scoped>

</style>