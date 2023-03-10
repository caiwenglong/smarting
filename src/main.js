import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/main.css';
import '@/style/index.less';

// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);
app.use(router).use(store).use(ElementPlus).mount('#app');
