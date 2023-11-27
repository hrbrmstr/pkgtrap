import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path'

export const __filename = fileURLToPath(import.meta.url);
export const __appdirname = dirname(dirname(__filename));

export const cwd = process.cwd();

export function appDir(dir) {
  return path.join(__appdirname, dir);
}

export async function makeAndMount(ctx, sourceDir, webRMountPoint) {

  await ctx.FS.mkdir(webRMountPoint)
  await ctx.FS.mount("NODEFS", { root: sourceDir }, webRMountPoint);

}