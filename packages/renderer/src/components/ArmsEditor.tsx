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

      editor.value = await monaco.editor.create(div.value as HTMLElement, {
        language: 'toml',
        theme: 'theme-github',
        automaticLayout: true,
        codeLens: false,
        value: data.value,
      });
      monaco.languages.register({id: 'toml'});
      await wireTmGrammars(monaco, registry, grammars, editor.value);
      div.value = editor.value.getDomNode() as HTMLElement;

      // listen change event
      editor.value?.onDidChangeModelContent(() => {
        const value = editor.value?.getValue() || '';
        if (data.value !== value) {
          data.value = editor.value?.getValue() || '';
          ctx.emit('onChange', data.value);
        }
      });
    });

    onUnmounted(() => {
      editor.value?.dispose();
    });

    const style = {width: '100%', height: '100%'};
    return () => (
      <div ref={div} class="monaco-editor-arms" style={style}/>
    );
  },
});
