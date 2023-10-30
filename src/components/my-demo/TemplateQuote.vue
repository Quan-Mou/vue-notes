<script setup>
import { onMounted, ref } from "vue";

    

    const input = ref(null);
    const input2 = ref(null);

    onMounted(() => {
        console.log(input.value)
        console.log(input.value.focus())
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