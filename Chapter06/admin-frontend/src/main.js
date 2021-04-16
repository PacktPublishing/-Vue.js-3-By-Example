import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Card from 'primevue/card';
import Toolbar from 'primevue/toolbar';
import router from './plugins/vue-router'
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
import Menubar from 'primevue/menubar';
import { Form, Field } from "vee-validate";
import "primeflex/primeflex.css";
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import './plugins/axios'

const app = createApp(App)
app.component("InputText", InputText);
app.component("Button", Button);
app.component("Card", Card);
app.component("Toolbar", Toolbar);
app.component("Textarea", Textarea);
app.component("Dialog", Dialog);
app.component("Menubar", Menubar);
app.component("Form", Form);
app.component("Field", Field);
app.use(PrimeVue);
app.use(router)
app.mount('#app')
