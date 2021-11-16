import {defineComponent, onMounted, onUnmounted, ref} from 'vue';
import * as monaco from 'monaco-editor';
import {wireTmGrammars} from 'monaco-editor-textmate';
import {Registry} from 'monaco-textmate';
import {loadWASM} from 'onigasm';
import {useAnni} from '/@/use/anni';

import toml from '/@/monaco/toml.tmLanguage';
import githubTheme from '/@/monaco/github.theme';

export default defineComponent({
  name: 'ArmsEditor',
  emits: ['onChange'],
  setup(_, ctx) {
    const editor = ref<monaco.editor.IStandaloneCodeEditor>();
    const div = ref<HTMLElement>();
    const anni = useAnni();
    const data = ref('');

    onMounted(async () => {
      console.log('mounted');
      try {
        await loadWASM(anni.onigasmUrl);
        // eslint-disable-next-line no-empty
      } catch {
      }

      const registry = new Registry({
        getGrammarDefinition: async () => {
          return {
            format: 'json',
            content: JSON.stringify(toml),
          };
        },
      });
      const grammars: Map<string, string> = new Map([['toml', 'source.toml']]);
      monaco.editor.defineTheme('theme-github', {base: 'vs', ...githubTheme});

      const instance = await monaco.editor.create(div.value as HTMLElement, {
        language: 'toml',
        theme: 'theme-github',
        automaticLayout: true,
        codeLens: false,
        value: data.value,
      });
      monaco.languages.register({id: 'toml'});
      await wireTmGrammars(monaco, registry, grammars, instance);
      editor.value = instance;

      // listen change event
      instance.onDidChangeModelContent(() => {
        const value = instance.getValue();
        if (value !== data.value) {
          data.value = value;
          ctx.emit('onChange', value);
        }
      });

      instance.addAction({
        id: 'toml-format',
        label: 'Format TOML',
        keybindings: [
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
        ],
        run: async (ed) => {
          data.value = await anni.formatTOML(data.value);
          ed.setValue(data.value);
        },
      });
    });

    onUnmounted(() => {
      // editor.value?.dispose();
    });

    const style = {width: '100%', height: '100%'};
    return () => (
      <div ref={div} class="monaco-editor-arms" style={style}/>
    );
  },
});
