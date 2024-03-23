import { createApp } from "vue"
import { createPinia } from "pinia"
import { registerSW } from "virtual:pwa-register"
import "./style.css"
import App from "./App.vue"

const pinia = createPinia()
const app = createApp(App)
import router from "./router"

const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm("A new update is available. Do you want to update now?")) {
            updateSW()
        }
    }
})

app.use(router)
app.use(pinia)
app.mount("#app")
