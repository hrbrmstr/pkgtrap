#!/usr/bin/env node

/**
 * Install WebR Packages To A Local Directory
 * 
 * @author boB Rudis (@hrbrmstr)
 * @module pkgtrap
 * Main program that parses CLI input, instantiates WebR, loads and syncs packages.
 */
import * as path from 'path'
import { existsSync, mkdirSync, rmdirSync } from 'fs';

import chalk from 'chalk'

import { Command } from 'commander'

import { WebR } from "webr";
import { makeAndMount, appDir, cwd } from './src/utils.mjs';

// these base R come along with the fs::dir_copy call so we remove them
const corePkgs = [ "base", "compiler", "datasets", "grDevices", "graphics", "grid", "methods", "parallel", "splines", "stats", "stats4", "tcltk", "tools", "translations", "utils", "webr" ]

/**
 * Take in a list of packages and an optional destination directory and 
 * have WebR install the packages, then use JavaScript to sync the internal
 * Emscripten library directory to the specified local filesystem path.
 * 
 * @param {string[]} pkgs 
 * @param {Object} options an object containing an `outputDir` field
 * @returns {void}
 */
async function trapPackages(pkgs, options) {

  const webR = new WebR();
  await webR.init();

  const dir = path.join(cwd, options.outputDir);

  if (!existsSync(dir)) {
    console.info(chalk.blue(`Creating output directory ${dir}`))
    mkdirSync(dir);
  }

  console.info(chalk.blue(`Mounting output directory to WebR's Emscripten filesystem…`))

  await makeAndMount(webR, dir, '/pkgs')

  console.info(chalk.blue(`Installing designated packages…`))

  pkgs.push('fs')
  pkgs = [ ... new Set(pkgs) ]

  await webR.installPackages(pkgs)

  console.info(chalk.blue(`Syncing packages to ${dir}`))

  await webR.evalRVoid(`
fs::dir_copy("/usr/lib/R/library", "/pkgs", overwrite=TRUE)
`)

  for (const pkg of corePkgs) {
    rmdirSync(path.join(dir, pkg), { recursive: true })
  }

  console.info(chalk.green(`Done!`))

  process.exit(0)
}

/**
 * Process command line and collect packages.
 */

const program = new Command()
program
  .name('pkgtrap')
  .description('Makes a local copy of a list of WebR WASM packages and their dependencies.')
  .version('0.1.0')
  .option('-o, --output-dir <dir>', `path to output directory where WebR WASM packages will be installed (will be created if it does not exist)`, "./pkgs")
  .arguments("[packages...]", "at least one package to 'trap', but can be a space-separated list of packages")
  .action(trapPackages)
  .parse()
