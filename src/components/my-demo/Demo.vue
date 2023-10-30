<script setup>

import  { ref, onMounted, onUnmounted } from 'vue'
import GlobalComponent from './GlobalComponent.vue'

const  count = ref(0);

function btn() {
    console.log("点击")
    count.value++;
}



const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))




</script>

<template>
    <div>
        <!-- <button @click="btn">{{ count }}</button>
        Mouse position is at: {{ x }}, {{ y }} -->
        <!-- <div>Demo</div> -->
        <!-- <CustomComponent/> -->
        <!-- <cust/> -->
        <Global-component/>
    </div>    
</template>






