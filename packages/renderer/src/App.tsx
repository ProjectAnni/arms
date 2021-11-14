import {defineComponent} from 'vue';
import {RouterView} from 'vue-router';

import '/@/App.css';
import type {GlobalThemeOverrides} from 'naive-ui';
import {NConfigProvider, NGi, NGrid} from 'naive-ui';
import WorkDirTree from '/@/components/WorkDirTree';

const themeOverrides: GlobalThemeOverrides = {
  Popover: {
    padding: '0',
  },
};

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <NConfigProvider themeOverrides={themeOverrides}>
        <NGrid xGap={12} cols={2}>
          <NGi>
            {/* TODO: address bar */}
            <WorkDirTree
              dir={[{name: '1', isDir: false}, {name: '2', isDir: true, children: [{name: '3', isDir: false}]}]}/>
          </NGi>
          <NGi><RouterView/></NGi>
        </NGrid>
      </NConfigProvider>
    );
  },
});
