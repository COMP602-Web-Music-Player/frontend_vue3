import { createApp } from 'vue';
import App from './App.vue';
import './common/base.css';
import * as elementIcons from '@element-plus/icons-vue';
import router from './router/index';
import store from './store';  // 引入 Vuex store

const app = createApp(App);
for (let iconName in elementIcons) {
  app.component(iconName, elementIcons[iconName]);
}

app.use(router).use(store).mount('#app');