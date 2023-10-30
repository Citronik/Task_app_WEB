/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import TheAlert from '@/components/Alerts/TheAlert.vue'

// Add router to app

const pinia = createPinia()
const app = createApp(App)

pinia.use(piniaPluginPersistedstate)
app.component('app-alert', TheAlert)

registerPlugins(app)

app.use(pinia)

app.mount('#app')
