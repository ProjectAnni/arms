import {createRouter, createWebHashHistory} from 'vue-router';
import ArmsEditor from '/@/components/ArmsEditor';

const routes = [
  {path: '/', name: 'Home', component: ArmsEditor},
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
