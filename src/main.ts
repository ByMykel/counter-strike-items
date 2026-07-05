import { createApp } from "vue"
import { createPinia } from "pinia"
import "./style.css"
import App from "./App.vue"
import router from "./router"
import { checkManifest } from "./utils/manifestGuard"

async function bootstrap() {
    await checkManifest()

    const pinia = createPinia()
    const app = createApp(App)

    app.use(router)
    app.use(pinia)
    app.mount("#app")
}

bootstrap()
