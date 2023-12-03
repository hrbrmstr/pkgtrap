import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path'

/**
 * @constant
 * @type {string}
 * @description The local filesystem path to where the source module is
 */
export const __filename = fileURLToPath(import.meta.url);

/**
 * @constant
 * @type {string}
 * @description The local filesystem path to where the app is.
 */
export const __appdirname = dirname(dirname(__filename));

/**
 * @constant
 * @type {string}
 * @description The current working directory in the IRL filesystem.
 */
export const cwd = process.cwd();

/**
 * Return the location the Node.JS app directory
 * 
 * @param {string} dir 
 * @returns {string}
 */
export function appDir(dir) {
  return path.join(__appdirname, dir);
}

/**
 * Use WebR.FS to create an Emscripten mount point and then mount an external
 * filesystem path to that internal mount point
 * 
 * @param {WebR} ctx WebR context 
 * @param {string} sourceDir external IRL filesystem directory
 * @param {string} webRMountPoint WebR.FS internal mount point to create
 * @returns {void}
 */
export async function makeAndMount(ctx, sourceDir, webRMountPoint) {
  await ctx.FS.mkdir(webRMountPoint)
  await ctx.FS.mount("NODEFS", { root: sourceDir }, webRMountPoint);
}