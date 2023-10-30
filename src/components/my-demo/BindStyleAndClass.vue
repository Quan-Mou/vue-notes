
<script setup>
import { ref,reactive } from "vue";

    const isActive = ref(true);

    const attributeList = reactive({
        a:123 == 123,
        b:123!=123,
        c:true
    })

    const actives = ref("active")
    const err = ref("err-d")


    const s1 = ref("red")

    const s2 = reactive({
        fontSize:"20px",
        color:"pink"
    })

</script>


<template>
    <div class="wrapper">
        <div :class="{active:isActive}">风吹过湖面</div>
        <div :class="attributeList">荡起了一圈圈波澜</div>
        <!-- 绑定数组 -->
        <div :class="[actives,err]">绑定数组1</div>
        <div :class="[actives,err ? 'err' : '']">绑定数组2</div>

        <!-- 绑定内联CSS -->
        <div :style="{color:s1}">绑定style1</div>
        <div :style="s2">绑定style2</div>
        <div :style="[s2,s1]">绑定style3</div>
    </div>
</template>


<style>
    .active {
        color:red;
    }
</style>