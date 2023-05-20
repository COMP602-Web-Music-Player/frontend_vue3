import { createApp } from 'vue'
import App from './App.vue'
import './common/base.css';
import * as elementIcons from '@element-plus/icons-vue';
import router from './router/index';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faMagnifyingGlass);
Vue.component('font-awesome-icon', FontAwesomeIcon);


const app = createApp(App);
for (let iconName in elementIcons) {
  app.component(iconName, elementIcons[iconName]);
}

app.use(router).mount('#app')