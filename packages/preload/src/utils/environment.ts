import * as util from 'util';
import * as child_process from 'child_process';

const exec = util.promisify(child_process.exec);

export async function getAnniVersion(anniPath?: string) {
  try {
    const {stdout} = await exec(anniPath ?? 'anni' + ' -V', {windowsHide: true});
    return stdout.substr('Project Anni '.length).trim();
  } catch {
    return undefined;
  }
}
