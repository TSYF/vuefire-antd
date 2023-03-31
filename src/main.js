import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";

const app = createApp(App);
const pinia = createPinia();

/*
    Test
    test2
*/

app.use(pinia);
app.use(router);

app.mount("#app");
