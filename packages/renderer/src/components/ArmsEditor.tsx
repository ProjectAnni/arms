import {defineComponent, onMounted, ref} from 'vue';
import * as monaco from 'monaco-editor';
import {wireTmGrammars} from 'monaco-editor-textmate';
import {Registry} from 'monaco-textmate';
import {loadWASM} from 'onigasm';
import {useAnni} from '/@/use/anni';

import toml from '/@/monaco/toml.tmLanguage';
import githubTheme from '/@/monaco/github.theme';

export default defineComponent({
  name: 'ArmsEditor',
  setup() {
    const editor = ref();
    const anni = useAnni();

    onMounted(async () => {
      await loadWASM(anni.onigasmUrl);

      const registry = new Registry({
        getGrammarDefinition: async () => {
          return {
            format: 'json',
            content: JSON.stringify(toml),
          };
        },
      });
      const grammars: Map<string, string> = new Map([['toml', 'source.toml']]);
      monaco.editor.defineTheme('vs-code-theme-converted', {base: 'vs', ...githubTheme});

      editor.value = await monaco.editor.create(editor.value, {language: 'toml', theme: 'vs-code-theme-converted'});
      monaco.languages.register({id: 'toml'});
      await wireTmGrammars(monaco, registry, grammars, editor.value);
    });

    const style = {width: '100%', height: '100%'};
    return () => (
      <div ref={editor} class="monaco-editor-arms" style={style}/>
    );
  },
});
