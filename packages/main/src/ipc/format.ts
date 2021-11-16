import {ipcMain} from 'electron';
import * as prettier from 'prettier';

export default function () {
  ipcMain.handle('format-toml', (event, input) => {
    return prettier.format(input, {
      tabWidth: 2,
      useTabs: false,
      endOfLine: 'lf',
      parser: 'toml',
      plugins: [require('prettier-plugin-toml')],
    });
  });
}
