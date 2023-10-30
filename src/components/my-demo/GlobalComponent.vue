<script setup>
    import {computed, reactive, ref} from "vue"


    const  myBookList = reactive({
        name:"QuanMou",
        books:["瓦尔登湖","人生","Vue核心技术","你的孤独，虽败犹荣"]
    })

    const myBookListIsNotNull = computed(() => {
        console.log("计算属性执行了")
        return myBookList.books.length > 0 ? "yes" : "no"
    })

    function myBookListIsNotNull2() {
        console.log("普通方法执行")
        return myBookList.books.length > 0 ? "yes" : "no"
    }

    function addBook() {
        myBookList.books.push("圣经")
        // myBookList.books
        console.log("添加图书")
        // console.log(myBookList.books)
    }

    function lookBookLen() {
        console.log(myBookList.books.length)
    }




    console.log(myBookList)
    console.log(myBookList.books.length)

    const msg = ref("<span style='color: red'>This should be red.</span>");
    const dynamicId = ref("10")
    const isButtonDisabled = ref(null);


    const obj = ref({
    ages:[10,20],
    num:{count:0}
    })
        
        console.log(obj.value.ages[0])
        console.log(obj.value.num.count++)
    

    const objectOfAttrs = {
        id: 'container',
        class: 'wrapper'
    }


    console.log("全局组件")
    console.log(dynamicId)

</script>

<template>
    <div>
        <h3>这是一个全局组件，可以在任何组件中使用</h3>
        <!-- <div>Using text interpolation: {{msg}}</div> -->
        <p>Using v-html directive: <span v-html="msg"></span></p>
        <p :id="dynamicId">{{dynamicId}}</p>
        <button :disabled="isButtonDisabled"></button>
        <button disabled="isButtonDisabled"></button>
        <p v-bind="objectOfAttrs">1</p>

        <div>{{ myBookList.books.length > 0 ? "yes":"no" }}</div>
        <div>{{ myBookListIsNotNull }}</div>
        <div>{{ myBookListIsNotNull2() }}</div>
        <div @click="addBook">点击添加图书数量</div>
        <div @click="lookBookLen">点击查看图书数量</div>
    </div>
</template>

<style scoped>



</style>