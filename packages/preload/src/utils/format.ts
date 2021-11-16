import {ipcRenderer} from 'electron';

export function formatTOML(input: string): Promise<string> {
  return ipcRenderer.invoke('format-toml', input);
}
