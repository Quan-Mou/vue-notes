<script setup>
import { onMounted, ref } from "vue";

    defineProps(["user"])
    

    const input = ref(null);
    const input2 = ref(null);

    onMounted(() => {
        console.log(input.value)
        console.log(input.value.focus())

        console.log("传递的属性：" + user)
    })
    

    function fn(el) {
        console.log(el)
    }
</script>


<template>
   <div>
    <input ref="input">
    <input :ref="fn" />
   </div>
</template>

<style>

</style>