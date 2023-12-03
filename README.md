# pkgtrap: Install WebR packages to a local filesystem directory.

[![npm
version](https://badge.fury.io/js/pkgtrap.svg)](https://badge.fury.io/js/pkgtrap)

`pkgtrap`
([GL](https://gitlab.com/hrbrmstr/pkgtrap)\|[NPM](https://www.npmjs.com/package/pkgtrap))
is a small Node.js CLI application to make it easier to sync WebR WASM R
packages to a local filesystem for CLI or web apps. See [the WebR CLI
Book](https://rud.is/books/webr-cli-book/) for details.

It is intended to be run as a CLI and is on NPM, so you can install it
via:

``` bash
$ npm install -g pkgtrap
```

You can also install the latest development version from GitLab:

``` bash
$ npm install -g git+https://gitlab.com/hrbrmstr/pkgtrap
```

## Usage

``` bash
pkgtrap --help
```

    Usage: pkgtrap [options] [packages...]

    Makes a local copy of a list of WebR WASM packages and their dependencies.

    Options:
      -V, --version           output the version number
      -o, --output-dir <dir>  path to output directory where WebR WASM packages
                              will be installed (will be created if it does not
                              exist) (default: "./pkgs")
      -h, --help              display help for command

`pkgtrap` defaults to using a local-to-current-working-directory
`./pkgs` directory but you can specify an alternate one via `-o` or
`--output-dir`.

Here’s an example run that loads up {fs} and {glue}

``` bash
pkgtrap fs glue
```

    Creating output directory /Users/hrbrmstr/projects/pkgtrap/pkgs
    Mounting output directory to WebR's Emscripten filesystem…
    Installing designated packages…
    Downloading webR package: fs

    Downloading webR package: glue

    Syncing packages to /Users/hrbrmstr/projects/pkgtrap/pkgs
    Done!

``` bash
tree -L 1 ./pkgs
```

    ./pkgs
    ├── fs
    └── glue

    3 directories, 0 files
