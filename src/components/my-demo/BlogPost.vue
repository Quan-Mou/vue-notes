<script setup>

    import {ref} from "vue"

    defineProps(["title"])


</script>


<template>

    <div>
        <h3>博客组件</h3>
        <div>title:{{title}}</div>
        <button @click="$emit('enlarge-text')">Enlarge text</button>
        <slot />
    </div>

</template>