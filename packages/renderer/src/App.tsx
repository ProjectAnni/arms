import {defineComponent} from 'vue';
import {RouterView} from 'vue-router';

import '/@/App.css';

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
        <img
          alt="Vue logo"
          src="../assets/logo.svg"
          width="300"
        />
        <RouterView/>
      </>
    );
  },
});
