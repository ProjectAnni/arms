import type {PropType} from 'vue';
import {defineComponent, ref} from 'vue';
import type {TreeOption} from 'naive-ui';
import {NButton, NIcon, NPopover, NTree} from 'naive-ui';
import type {TreeRenderProps} from 'naive-ui/lib/tree/src/interface';
import {MusicalNotes, FolderOpen, FolderSharp} from '@vicons/ionicons5/es';

export interface File {
  name: string;
  isDir: boolean;
  children?: File[];
}

function toTreeOption(f: File, parent = ''): TreeOption {
  const key = parent + '/' + f.name;
  return {
    label: f.name,
    key,
    isLeaf: !f.isDir,
    children: f.isDir && f.children ? f.children.map(c => toTreeOption(c, key)) : undefined,
  };
}

export default defineComponent({
  name: 'WorkDirTree',
  props: {
    dir: {
      type: Object as PropType<File[]>,
      required: true,
    },
  },
  setup(props) {
    const r: TreeOption[] = props.dir.map(d => toTreeOption(d));

    const xRef = ref(0);
    const yRef = ref(0);
    const showContextMenu = ref(false);
    const contextObject = ref<TreeOption | undefined>();

    function hideContextMenu() {
      showContextMenu.value = false;
      contextObject.value = undefined;
    }

    function displayContextMenu(x: number, y: number, obj: TreeOption) {
      xRef.value = x;
      yRef.value = y;
      contextObject.value = obj;
      showContextMenu.value = true;
    }

    function renderLabel(props: TreeRenderProps) {
      return (
        <span
          onContextmenu={(event) => displayContextMenu(event.clientX, event.clientY, props.option)}
          style={{display: 'inline-block', width: '100%'}}
        >
          {props.option.label}
        </span>
      );
    }

    return () =>
      <div style={{height: '100%'}}>
        <NTree
          selectable={false}
          blockNode
          blockLine
          data={r}
          renderPrefix={renderPrefix}
          renderLabel={renderLabel}
          onUpdateSelectedKeys={(keys) => {
            console.log(keys);
          }}
        />
        <NPopover
          showArrow={false}
          trigger={'manual'}
          x={xRef.value}
          y={yRef.value}
          show={showContextMenu.value}
          placement={'right-start'}
          onClickoutside={(event) => {
            if (!(xRef.value === event.clientX && yRef.value === event.clientY)) {
              hideContextMenu();
            }
          }}
          style={{padding: 0, width: '120px'}}
        >
          <NButton
            text
            bordered
            style={{padding: '12px'}}
            onClick={() => {
              hideContextMenu();
            }}>
            写入元数据
          </NButton>
        </NPopover>
      </div>;
  },
});

function renderPrefix({option}: TreeRenderProps) {
  let icon;
  if (option.isLeaf) {
    icon = <MusicalNotes/>;
  } else if (option.children) {
    icon = <FolderSharp/>;
  } else {
    icon = <FolderOpen/>;
  }

  return <NIcon>{icon}</NIcon>;
}

