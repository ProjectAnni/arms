import {defineComponent, ref, KeepAlive} from 'vue';
import {RouterView} from 'vue-router';

import '/@/App.css';
import type {GlobalThemeOverrides} from 'naive-ui';
import {NConfigProvider, NInput, NLayout, NLayoutContent, NLayoutFooter, NLayoutHeader, NLayoutSider} from 'naive-ui';
import WorkDirTree from '/@/components/WorkDirTree';

const themeOverrides: GlobalThemeOverrides = {
  Popover: {
    padding: '0',
  },
};

const fullHeight = {height: '100%', maxHeight: '100%'};

export default defineComponent({
  name: 'App',
  setup() {
    const collapsed = ref(false);

    return () => (
      <NConfigProvider themeOverrides={themeOverrides} style={fullHeight}>
        <NLayout style={fullHeight} position={'absolute'}>
          <NLayoutHeader bordered style={{height: '4%'}}>
            <NInput type={'text'} size={'small'} placeholder={'Audio path'}/>
          </NLayoutHeader>
          <NLayout hasSider style={{top: '4%', bottom: '20%'}} position={'absolute'}>
            <NLayoutSider
              width={'25%'}
              bordered
              collapsed={collapsed.value}
              collapseMode={'width'}
              showTrigger={'bar'}
              showCollapsedContent={true}
              onUpdateCollapsed={(c) => collapsed.value = c}
            >
              <KeepAlive>
                {
                  collapsed.value ?
                    <div>TODO</div> :
                    <WorkDirTree path={'/home'}/>
                }
              </KeepAlive>
            </NLayoutSider>
            <NLayoutContent>
              <RouterView/>
            </NLayoutContent>
          </NLayout>
          <NLayoutFooter bordered position={'absolute'} style={{height: '20%'}}>
            TODO: Footer
          </NLayoutFooter>
        </NLayout>
      </NConfigProvider>
    );
  },
});
