import {contextBridge} from 'electron';
import {readdir} from 'fs/promises';
import {readdirSync} from 'fs';
import {getAnniVersion} from '/@/utils/environment';
import onigasmUrl from 'onigasm/lib/onigasm.wasm?url';
import {formatTOML} from '/@/utils/format';

/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
const api: ElectronApi = {
  versions: process.versions,
};

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */
contextBridge.exposeInMainWorld('electron', api);

const anniExposed: AnniApi = {
  async scanFolder(path: string) {
    const dir = await readdir(path, {withFileTypes: true});
    return dir.filter(n => !n.name.startsWith('.')).map((file) => {
      return {
        name: file.name,
        isDir: file.isDirectory(),
      };
    });
  },

  scanFolderSync(path: string) {
    const dir = readdirSync(path, {withFileTypes: true});
    return dir.filter(n => !n.name.startsWith('.')).map((file) => {
      return {
        name: file.name,
        isDir: file.isDirectory(),
      };
    });
  },

  version: getAnniVersion(),

  onigasmUrl: onigasmUrl,

  formatTOML,
};

contextBridge.exposeInMainWorld('anni', anniExposed);
