# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).





# 1.初始Vue

**该笔记代码使用组合式API风格编写。**





安装方式：npm create vite@latest ： 创建最新版本vue

vue的两种风格书写：1.选项式 2. 组合式

- 选项式API 

  - vue2的写法吧
  - 这种风格以**组件实例概念为中心**，及this。

- 组合式API

  - 类似React的Hook，引入外部函数维护内部数据。（**有点类似函数式编程，但不是函数式编程**）

  - 使用组合式api需要在`script`标签中添加 setup 属性，这个属性是一个标识，告诉vue在编译时进行一些处理。 ：

  - ~~~js
    <script setup>
    </script>
    ~~~

  - 这种风格的核心思想是在**函数式作用域内定义响应式状态变量**

  - 其他和选项式没有太大差别



创建一个Vue实例

每个Vue应用都是通过CreateApp() 函数创建一个新的应用实例。`createApp(根组件)`，每一个应用都需要一个根组件，其他组件作为该组件的子组件。创建应用实例后必须调用`mount()`方法挂载才会被渲染出来，mount方法接收一个"容器"，该参数可以是一个实际的DOM元素，或者使用css选择器选择的元素。`<div id=app></div>` 、 `#app`。

根组件将会渲染在该容器当中，`.mount()` 方法在整个应用配置和资源注册完成后被调用，它返回的`根组件`实例而非应用实例。





# 2.Vue基础

vue使用一种基于HTML的模板语法，在底层机制中，Vue会将模板编译成高度优化后的JavaScript代码，集合响应式系统，当应用状态变更时，Vue能够智能的推导出需要重新渲染的组件的最少数量，并应用最少的DOM操作。

### 1.插值语法

文本插值：`{{}}` : `<span>Message: {{ msg }}</span>` {{}}内的值会被替换到响应组件实例中msg的值，并且当msg更改时，它也会同步更新。

{{}} 内的内容会被解释为纯文本内容，如果想插入HTML，你需要使用`v-html` 指令：`<span v-html="msg"></span>`。

### 2.指令

以v开头的都是Vue提供的内置指令：https://cn.vuejs.org/api/built-in-directives.html#v-on。指令attribute的值为一个JavaScript表达式，除了几个少数几个例外（v-slot/v-for/v-on）

参数： 

有一些指令会需要一些参数，在指令名后通过一个冒号隔开做标识符，例：`<a v-bind:href="url">` 简写`<a :href="url">`

这里的href就是一个参数，告诉v-bind将url的值绑定到href属性上。

再看一个例子：`v-on` : `<div v-on:click="doSomething"></div>` 监听DOM事件，简写`@`,`@click`

动态参数：

~~~javascript
<a v-on:[eventName]="doSomething"> ... </a>

<!-- 简写 -->
<a @[eventName]="doSomething">
~~~

修饰符 modifiers

以.点开头的特殊后缀，表明指令需要以一些特殊的方式被绑定，例如.prevent 会告知v-on指令对触发的事件调用`event.preventDefault()`;









### 3.attribute绑定

{{}} 不能使用在HTML attribute中，想要响应式的绑定一个attribute，应使用`v-bind`

`<div v-bind:id="dynamicId"><div>`：该元素的id将会和dynamicId绑定在一起，如果绑定的值为`null`或者`undefined`那该attribute将会从渲染的元素中移除。

v-bing简化语法：`<div :id="dynamicId"> </div>`

布尔值attrbute：例如 `<button :disabled=""></button>`,当绑定的布尔值为真或在空字符串是该值会存在，当值为假是会被忽略。

动态绑定多个值：

~~~javascript
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
<div v-bind="objectOfAttrs"></div>
最终会被渲染为：
<div id="container" class="wrapper"></div>
~~~

{{}}、模板内可以使用JavaScript表达式。

~~~javascript
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
~~~

**注意：仅支持表达式，也就是必须有返回**

也可以在表达式中调用函数。绑定的表达式是在每次更新是都会被重新调用，因此该函数不应该产生任何副作用，比如改变数据或触发异步操作。

### 4.响应式

声明响应状态：`ref()`

ref接收参数，并将值包裹在.value属性的ref对象中返回。

~~~javascript
const count = ref(1)
console.log(count.value) // 1
console.log(count.value++) // 2
~~~

深层响应式：

ref可以接收任何类型的值，包括嵌套对象、数组，或者JavaScript内置的数据结构，例如Map。ref会使这些值具有深层响应式，意味着当数组、嵌套对象发生改变是，变化也会被检测到。

~~~javascript
const obj = ref({
    ages:[10,20],
    num:{count:0}
})
console.log(obj.value.ages[0])
console.log(obj.value.num.count++)    
~~~

还有一种声明响应式值的方法：`reactive()` reactive具有一些局限性，如只能是数组，对象。不可以是基本数据类型。

reactive对象内的属性会自动解包，看起来就像是一个普通对象，例如：

~~~javascript
const myBookList = reactive({
    name:"QuanMou",
    Books:[
        "瓦尔登湖","人生","Vue核心技术","你的孤独，虽败犹荣"
    ]
})

// 像普通对象一样访问：
console.log(myBookList.Books.length)

~~~



具体参考官网。



DOM更新时机：

当修改了响应式状态后，DOM会自动更新，或者使用全局API`nextTike()` 。

### 5.计算属性

~~~javascript
const myBookList = reactive({
    name:"QuanMou",
    Books:[
        "瓦尔登湖","人生","Vue核心技术","你的孤独，虽败犹荣"
    ]
})

// 这就是一个计算属性
const myBookListIsExist = computed(() => {
    myBookList.Books.length > 0 ? "yes" : "no"
})
~~~

计算属性和一个普通函数的写法非常相似，它们的区别：

- 缓存：计算属性只有在依赖的属性发生改变才会重新执行，否则执行的是缓存数据。而函数每次在组件渲染时都会重新执行。

计算属性传入一个函数时默认使用的是getter方法，默认是只读的，当你尝试修改一个计算属性时会发出警告，并且getter方法内只做计算不应该包含其他副作用的代码，例如异步请求或者更改DOM（在**侦听器**中根据其他响应式状态来变更或创建副作用）；当你修改改变计算属性时，可以传入一个对象分别提供get、set方法：

~~~javascript
const myBookListIsExist = computed({
    get() {
        return myBookList.Books.length
    },
    set(value) {
        myBookList.name = value
    }
})
~~~

### 6.绑定class和style

#### -绑定class

数据绑定的一个常见需求场景时操作的元素的CSS class列表和内联样式(style),因为它们都是attribute，所以可以通过v-bind将它们的值动态的绑定，

绑定对象：

~~~javascript
const isActive = ref(true)
<div :class="{active:isActive}">风吹过湖面</div>

const attributeList = reactive({
        a:123 == 123,
        b:123!=123,
        c:true
    })	
<div :class="attributeList">荡起了一圈圈波澜</div>

// 或者绑定一个计算属性。
~~~

绑定数组：

~~~javascript
        <div :class="[actives,err]">绑定数组1</div>
        <div :class="[actives,err ? 'err' : '']">绑定数组2</div>
~~~

如果同时在组件上绑定了class和在该组件里的根元素绑定了class，那么它们的class会合并。

~~~java
<my-component class="b"> // 组件

my-component 组件的内容：
<div class="a"> // 根元素
    <h3>haha！</<h3>
</div>

渲染的结果：
<div class="b a"> // 根元素
    <h3>haha！</<h3>
</div>    
~~~

#### -绑定内联style

绑定对象、数组

~~~javascript
    const s1 = ref("red")

    const s2 = reactive({
        fontSize:"20px",
        color:"pink"
    }) 
		<!-- 绑定内联CSS -->
        <div :style="{color:s1}">绑定style1</div>
        <div :style="s2">绑定style2</div>


// 数组
        <div :style="[s2]">绑定style3</div>
~~~

### 7.条件渲染

`v-if` 指令 只有当条件为真时才会渲染。`v-else`必须跟在`v-if`后面，否则它不会被识别到。`v-else-if` 和js中的if语句一样。不多说。

v-if也可以使用在`<template></template>`上。

`v-show` 也是根据条件渲染，v-show改变的是元素的display值。

v-show不支持在`<template>`元素上使用。

v-if和v-show的不同：

- v-if是是真实的按条件渲染，在切换时，条件内的监听器和子组件都会被销毁和重建。
- 相比之下，v-show不管初始条件如何始终都会被渲染，只有display会被切换。
- 总的来说，v-if有更高的切换开销，而v-show具有更高的初始渲染开销。
- 因此，当需要频繁的切换时建议使用v-show，而如果v-if的条件很少改变时，则用v-if更合适。



### 8.列表渲染

`v-for` 指令基于一个数组来渲染一个列表，v-for指令的值需要`item in items` 形式的特殊语法，其中`items` 是源数组的数组，`item` 是数组的每一项的别名。

~~~java
 const items = ref([{book:"瓦尔登湖",id:1},{book:"你的孤独，虽败犹荣",id:2},{book:"人生",id:3}])
     
 <ul>
   <li v-for="item in items ">
      {{ item.book }}
   </li>
 </ul>
~~~

第二个参数取出索引：`(item,index) in itmes`

解构取出book：`{book} in items`或`{book},index in items`

**`v-for`与对象**

~~~javascript
    const myObj = reactive({
        name:"QuanMou",
        age:19,
        address:"NanChang"
    })
    
      <ul>
            <li v-for="value in myObj"> // 遍历次序会根据Object.keys()的返回值决定
                {{ value }}
            </li>
        </ul>
~~~

- 提供第二个值得到key：`(value,key) in myObj`
- 提供第三个值得到索引：`(value,key,index) in myObj`

**在v-for中使用范围值：**

~~~javascript
<ul>
      <li v-for="n in 10">{{ n }}</li> // n 从 1 开始 -- 10；
 </ul>
~~~

`<template>` 上的v-for：

~~~javascript
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
~~~

**可以在组件上使用v-for:**

~~~javascript
  const list = reactive([
    {msg:"haha"},
    {msg:"hehe"},
    {msg:"heihei"}
  ])
  
<Temp v-for="item in list"/>
~~~

这将不会传递任何数据给组件，因为组件有自己的作用域，为了将迭代后的数据传入组件，我们需要传递props：

~~~javascript
<Temp v-for="item in list" :msg=item.msg/>
    
// Temp 组件：
<script setup>
    defineProps(['msg']) // 这里的取值要和传过来的属性一致
</script>

<template>
    <div>
        <h4>Temp组件</h4>
        <div>{{ msg }}</div>
    </div>
</template>
    
    
~~~

**数组变化侦测:**

Vue 能够侦听响应式数组的变更方法，并在它们被调用时触发相关的更新。这些变更方法包括：

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`



`v-if`和`v-for`:

不推荐在同一元素中使用同时使用v-if和v-for，因为v-if优先级比v-for更高，如果v-if依赖v-for中的属性时，将会报错

通过key状态管理

使用-for时，推荐给每个元素提供一个对应的key，以便Vue可以跟踪每个节点的标识。从而重用和重新排序现有的元素。

### 9.事件处理

使用`v-on` 简写 `@` 来监听DOM事件，并在触发时执行对应的JavaScript代码，用法`v-on:click="handler"`、`@click="handler"`

事件处理值（handler）可以是：

1. **内联事件处理器**：事件被触发时执行的内联 JavaScript 语句 (与 `onclick` 类似)。

   内联事件处理器通常用于简单的场景：

   `<button @click="count++">Add 1</button> <p>Count is: {{ count }}</p>`

2. **方法事件处理器**：一个指向组件内定义的方法的属性名或路径

   随着事件处理器的逻辑变得愈发复杂，内联代码方式变得不够灵活。因此 `v-on` 也可以接受一个方法名或对某个方法的调用。

事件修饰符：

- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`

按键修饰符、系统按键修饰符、鼠标按键修饰符等，具体查看官方文档：https://cn.vuejs.org/guide/essentials/event-handling.html#key-modifiers

### 10.表单输入绑定

`v-model` 指令会帮我监听对应的时间并绑定value值，例如表单，会监听表单input时间，并动态绑定它的value值。

修饰符：

例如默认用户输入的值转换为数字，可以在`v-model`后添加.number修饰符来管理输入：`v-model.number="xx"`

或者`.trim` 修饰符，默认去除用户的两端输入的空格。

### 11.生命周期

每个组件实例在创建时都需要经历一系列的的初始化步骤，比如设置好数据侦听，编译模板，挂载实例到DOM，以及在数据改变时更新DOM,这个过程中，它也会运行称为**生命周期钩子函数**，在特定阶段运行某段代码。

`onMounted` 函数在组件初始渲染并创建DOM节点后运行。

`onUnMounted` 在组件卸载后执行

`onUpdated` 组件内任意DOM更新后都会执行，注意不要在该函数类更改DOM状态，否则会无限循环下去。

更多钩子函数参考：https://cn.vuejs.org/api/composition-api-lifecycle.html

### 12.侦听器



在组合式API中，可以使用`watch` 函数，在每次响应式状态值发生改变时触发回调。

~~~javascript
watch(监听的数据源，回调函数，可选的对象)
~~~

监听的数据源可以是一个ref、包括计算属性、getter函数，响应式对象，或者以上组成的数组

回调函数接收三个参数：1.新值，旧值，以及一个清理副作用的回调。

可选对象：比如`{immediate:true}` 在侦听器创建时立即触发回调，第一个调用的旧值是undefined，具体查看官方文档。

`watchEffect`

~~~javascript

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
~~~

`watch`和`watchEffect`的区别：

watch明确依赖响应式状态，可以获取到旧值，具有惰性，不会立即执行，当然也可以执行可选参：immediate让它首次自动执行。

watchEffect自动追踪用到的响应式状态，会立即执行一次。

停止侦听器：

在setup() 或 <script setup> 中**同步**创建的侦听器，会自动绑定到宿主组件实例上，当宿主组件卸载是会自动停止，在大多数情况下，无序关注怎么停止一个侦听器。

关键是侦听器必须是同步创建，如果异步创建侦听器（比如在定时器里面创建），它不会绑定到当前组件上，你必须手动停止，否则会造成内存泄漏。

如何停止：调用 watch或者watchEffect的返回值即可。

~~~javascript
const unwatch = watchEffect(() => {});
unwatch();
~~~

### 13.模板引用

如果要访问底层DOM元素，可以使用一个特殊的attribute属性，它允许对一个DOM元素或者子组件实例挂载后，获取对它的直接引用。

~~~javascript
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
~~~

函数模板引用

除了使用字符串值作名字，`ref` attribute 还可以绑定为一个函数，会在每次组件更新时都被调用。该函数会收到元素引用作为其第一个参数：

`<input :ref=> (el) => { }`

注意我们这里需要使用动态的 `:ref` 绑定才能够传入一个函数。当绑定的元素被卸载时，函数也会被调用一次，此时的 `el` 参数会是 `null`。你当然也可以绑定一个组件方法而不是内联函数。

组件上的ref

模板引用也可以用在一个子组件上，这样获得的就是一个组件实例。

如果子组件使用的是选项式API而没有使用<script setup> ，被引用的组件和该组件的this完全一样，这意味着父组件对子组件的每一个属性和方法都有完全的访问权，这使得在父组件和子组件之间创建紧密耦合的实现细节变得很容易。

有一个例外的情况，使用了 `<script setup>` 的组件是**默认私有**的：一个父组件无法访问到一个使用了 `<script setup>` 的子组件中的任何东西，除非子组件在其中通过 `defineExpose` 宏显式暴露。

### 14.组件基础

组件将ui划分为独立的，可重用的部分，并且可以对每个部分独立的进行单独的思考。实际应用中，组件常常别层层嵌套为树状结构。可以在每个组件封装自定义的内容和逻辑。

定义一个组件：

当使用构建工具时一般会把Vue组件定义在一个.vue的文件中，这被叫做单文件组件（SFC）。

当不使用构建工具时一个Vue组件以一个包含Vue特定选项的JavaScript对象来定义。

使用组件：

例如:定义了一个`ButtonBtn.vue` 子组件，需要在父组件中导入：

~~~javascript
<script setup>
	import ButtonBtn from "./ButtonBtn.vue"     
</script>
~~~

ButtonBtn.vue 这个组件会以默认导出的形式暴露给外部。

每个组件可以使用多次，组件和组件之间是独立的，都有一个单独的实例。

在单文件组件中，推荐使用`PascaCase` 命名，以此来区分原生的HTML，虽然原生html不区分大小写，但Vue单文件会在Vue编译时区分大小的。

传递props：

例如再写一个博客，需要一个博客组件，该组件内的布局都一样，只有标题或内容不一致，这时就需要props传递不同的标题和内容来区分。

~~~java
// BlogPost.vue

<script setup>
	const props = defindProps(['title'])    
</script>
<template>
	<h3>{{props.title}}</h3>    
</template>    
    
~~~

`defineProps` 是一个仅 `<script setup>` 中可用的编译宏命令，并不需要显式地导入。声明的 props 会自动暴露给模板。`defineProps` 会返回一个对象，其中包含了可以传递给组件的所有 props

~~~javascript
const props = defineProps(['title'])
console.log(props.title)
~~~

在实际应用中，我们可能在父组件中会有如下的一个博客文章数组：

~~~javascript
const posts = ref([
  { id: 1, title: 'My journey with Vue' },
  { id: 2, title: 'Blogging with Vue' },
  { id: 3, title: 'Why Vue is so fun' }
])
~~~

这种情况下，我们可以使用 `v-for` 来渲染它们：

~~~javascript
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
 />
~~~

监听事件：

例如放大博客的字体

子组件：

~~~javascript
    <div>
        <h3>博客组件</h3>
        <div>title:{{title}}</div>
        <button @click="$emit('enlarge-text')">Enlarge text</button> 
    </div>
~~~

使用$emit抛出一个自定义事件

在父组件中通过v-on或者@监听抛出的事件

~~~java
const posts = ref([
  /* ... */
])

const postFontSize = ref(1)
    
    
<div :style="{fontSize:postSize + 'em'}">
      <BlogPost v-for="item in posts" :key="item.id" :title="item.title" @enlarge-text="postSize += 0.2"/>
    </div>
~~~

通过插槽来分配内容：

~~~javascript
// MyComponent组件内
<template>
  <div class="alert-box">
    <strong>This is an Error for Demo Purposes</strong>
    <slot /> // 插槽内容
  </div>
</template>

// 父组件
<MyComponent>
    插槽内容
</MyComponent>
~~~

















# 进阶

## Web Component

Web Component是一组原生Web API的统称，

跳过组件解析：

默认情况下，Vue会将任何非原生的HTML标签优先当做Vue组件处理，而将一个渲染自定义元素的作为后备选项，这会在开发时导致Vue抛出一个"解析组件失败的警告"



传递DOM属性























# 深入组件

### 注册

组件注册：全局注册和局部注册

全局注册：

使用应用实例的component方法，该方法可以链式调用，app.component('MyComponent', MyComponent)。这样就注册了一个全局组件，不需要引入直接在任意组件中使用即可。

全局注册虽然方便，但是有以下几个问题：

- 全局注册，但并没有使用的全局组件无法在生产打包时被自动移除 (也叫“tree-shaking”)。如果你注册了一个全局组件，但并没有实际使用，它依然会出现在打包后的js文件。
- 全局注册在大型项目中使项目的依赖关系变得不那么明确。在父组件中使用子组件时，不太容易定位子组件的实现。和使用过多的全局变量一样，这可能会影响应用长期的可维护性。

### props

一个组件需要显式的声明它所需要的props，这样vue才知道外部哪些传入的是props，哪些是透析attribute。

使用`defineProps()` 来声明：

~~~vue
defineProps(['title']) // 获取对象里的title属性
const props = defineProps(['title']) 
console.log(props.title)
~~~

除了上面的形式还可以对象的形式声明：

~~~js
defineProps({
  title:String,
  age:Number
})
~~~

对于以对象形式声明中的每个属性，key 是 prop 的名称，而值则是该 prop 预期类型的构造函数。比如，如果要求一个 prop 的值是 `number` 类型，则可使用 `Number` 构造函数作为其声明的值。

传递props的细节：

如果你要传入一个数字，或者布尔值，数组等，需要使用 v-bind。

如果你的属性需要接受一个对象的所有属性，需要使用 完整的v-bind的写法：

~~~vue
<MyComponent v-bind="对象"></MyComponent>
~~~

单向数据流：

所有的 props 都遵循着**单向绑定**原则，props 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。这避免了子组件意外修改父组件的状态的情况，不然应用的数据流将很容易变得混乱而难以理解。

另外，每次父组件更新后，所有的子组件中的 props 都会被更新到最新值，这意味着你**不应该**在子组件中去更改一个 prop。若你这么做了，Vue 会在控制台上向你抛出警告。

在大多数场景下，子组件应该抛出一个自定义事件，来告诉父组件做出改变。

### 组件事件

触发和监听事件：

使用$emit() 触发自定义事件，父组件可以通过v-on简称@来监听事件：

~~~vue
<button @click="$emit('updateV')">
 	发送事件 
</button>

// 父组件
<MyComponent @updateV="callback"></MyComponent>
~~~

和原生 DOM 事件不一样，组件触发的事件**没有冒泡机制**。你只能监听直接子组件触发的事件。平级组件或是跨越多层嵌套的组件间通信，应使用一个外部的事件总线，或是使用一个[全局状态管理方案](https://cn.vuejs.org/guide/scaling-up/state-management.html)。

事件参数：

~~~vue
<button @click="$emit('updateV','QuanMou',19)">
 	发送事件 
</button>

// 父组件
<MyComponent @updateV="callback"></MyComponent>

const callback = (name,age) => {

}
~~~

所有传入 `$emit()` 的额外参数都会被直接传向监听器。举例来说，`$emit('foo', 1, 2, 3)` 触发后，监听器函数将会收到这三个参数值。

声明要触发的事件：

组件中可以使用`defineEmits()` 来声明它需要触发的事件，

~~~vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
~~~

### 组件 v-model

v-model 可以在组件上使用，以实现双向绑定。

当在一个组件中v-model时：

~~~vue
<input v-model="searchText" />




const mgs = ref("")

<MyComponent v-model="mgs">
	
</MyComponent>
会展开为下面的形式：
<MyComponent :model-value="mgs" @update:model-value="newVal => {mgs = newVal}">
	
</MyComponent>

要让上面的组件工作起来需要再MyComponent组件内部做以下操作：
把model-value的值绑定到内部的input元素中，监听@input事件发送update:model-value事件。
部分代码：
defineProps(['modelValue'])
<input :value="modelValue" @input="$emit('update:model-value',e.target.value)">


~~~

v-model的参数：

默认情况下，`v-model` 在组件上都是使用 `modelValue` 作为 prop，并以 `update:modelValue` 作为对应的事件。我们可以通过给 `v-model` 指定一个参数来更改这些名字：

~~~vue
<MyComponent v-model:title="bookTitle" />
~~~

~~~vue
<!-- MyComponent.vue -->
<script setup>
defineProps(['title'])
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
~~~

多个v-model绑定：

如果组件内有多个input时，可以传入多个v-model。

做法和用法和上面一样。

组件的v-model修饰符：

详细看官方文档。

















### 透传"attribute"

#### attribute继承：

透传attribute指的是传递给一个组件，确没有被该组件声明props或者emit或v-on监听器，最常见的class，id，style等。透传的 attribute 会自动被添加到根元素上。如果根元素上已有class，透传的attribute会和根元素上的class合并。

#### v-on监听器继承：

同样的，在组件中声明的监听器会给传递到组件内的根元素中，如果组件根元素也声明了一个监听器，那么，根元素自己的监听器和从父组件继承的监听都会生效。

#### 深层组件的继承：

如果一个组件内的根元素还是一个组件，会被继承。

#### 禁用继承：

如果你不想让组件继承attribute，可以在 组件选项中禁用：

~~~vue
defineOptions({
	inheritAttrs:false
})
~~~

透传的attribute会存在`$attrs` 中，可以在模板中使用。

#### 多根节点的attribute继承：

和单根节点组件有所不同，有着多个根节点的组件没有自动 attribute 透传行为。如果 `$attrs` 没有被显式绑定，将会抛出一个运行时警告。

template

```
<CustomLayout id="custom-layout" @click="changeValue" />
```

如果 `<CustomLayout>` 有下面这样的多根节点模板，由于 Vue 不知道要将 attribute 透传到哪里，所以会抛出一个警告。

~~~html
<header>...</header>
<main>...</main>
<footer>...</footer>
~~~

如果 `$attrs` 被显式绑定，则不会有警告：

~~~html
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
~~~

#### 在 JavaScript 中访问透传 Attributes

如果需要，你可以在 `<script setup>` 中使用 `useAttrs()` API 来访问一个组件的所有透传 attribute：

~~~vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
~~~

### 插槽

















# 疑问

##### 1.应用实例？

createApp() 返回的就是一个应用实例。

createApp().mount() 返回的是根组件实例。

应用实例相关API：https://cn.vuejs.org/api/application.html#app-component

##### 2.nextTick() 是什么，怎么用？

##### 3.关于ref、计算属性(已解决)

~~~javascript
    const  myBookList = ref({
        name:"QuanMou",
        books:["瓦尔登湖","人生","Vue核心技术","你的孤独，虽败犹荣"]
    })
    

    const myBookListIsNotNull = computed(() => {
        return myBookList.value.books.length > 0 ? "yes" : "no"
    })
    
    console.log(myBookList.books.length) // 为什么报错

	console.log(myBookList.value.books.length)

	<div>{{ myBookList.books.length > 0 ? "yes":"no" }}</div> // 为什么又不报错？
~~~









# 答



##### 1.使用 `v-html` 指令是非常危险的，因为这非常容易造成XSS漏洞

##### 2.当动态绑定的值为null或者undefined时，该attribute不会渲染出来























# HTTP请求

fetch

fetch是浏览器内置的一个API，无需额外的库或依赖。它支持promise，跨站请求，提供一个了一个request对象，因为是一个较新的api，在对老版本浏览器会不兼容。不支持取消请求。

~~~javascript
fetch(url,[options])
~~~

- url:访问的地址
  - options：method，header等，没有这个参数，默认是get请求



































