import { createApp } from 'vue'
import GlobalComponent from "./components/my-demo/GlobalComponent.vue"

import './style.css'
import App from './App.vue'



// createApp(App).mount('#app')

// 应用实例
const appInstance = createApp(App); 
appInstance.mount("#app");

appInstance.component("Cust",GlobalComponent);



console.log(appInstance);


console.log("main.js run----")
