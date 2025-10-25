import { createApp } from "vue"
import { createPinia } from "pinia"
import "./style.css"
import App from "./App.vue"
import { getCurrentLocale } from "./utils"
import router from "./router"
import { createI18n } from "petite-vue-i18n"
import { messages } from "./locales"

const i18n = createI18n({
    globalInjection: true,
    locale: getCurrentLocale(),
    fallbackLocale: "en",
    messages: messages
})

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(i18n)
app.mount("#app")
