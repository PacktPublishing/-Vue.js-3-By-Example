import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Card from 'primevue/card';
import Toolbar from 'primevue/toolbar';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import router from './plugins/vue-router'
import "primeflex/primeflex.css";
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App)
app.component("InputText", InputText);
app.component("Button", Button);
app.component("Card", Card);
app.component("Toolbar", Toolbar);
app.component("Calendar", Calendar);
app.component("Dialog", Dialog);
app.use(PrimeVue);
app.use(router)
app.mount('#app')
