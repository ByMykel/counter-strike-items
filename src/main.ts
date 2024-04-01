import { createApp } from "vue"
import { createPinia } from "pinia"
// HACK: No typescript declaration file available: https://github.com/apexcharts/vue3-apexcharts/issues/2
// eslint-disable-next-line
// @ts-ignore
import VueApexCharts from "vue3-apexcharts"
import "./style.css"
import App from "./App.vue"

const pinia = createPinia()
const app = createApp(App)
import router from "./router"

app.use(router)
app.use(pinia)
app.use(VueApexCharts)
app.mount("#app")
