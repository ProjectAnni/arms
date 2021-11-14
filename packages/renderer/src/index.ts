import {createApp} from 'vue';
import App from '/@/App';
import router from '/@/router';

import naive from 'naive-ui';
import 'vfonts/FiraCode.css';

createApp(App)
  .use(router)
  .use(naive)
  .mount('#app');
