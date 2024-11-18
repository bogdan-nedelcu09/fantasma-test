# fantasma-games-test-project

Test application - Nedelcu Petrica Bogdan

## Getting Started

Versions:
- [Typescript](https://www.typescriptlang.org/) 2.9.2
- [Webpack](https://webpack.js.org/) 3.10.0
- [PixiJS](http://www.pixijs.com/) 4.8.1

### Included PixiJS plugins
- pixi-layers (former [pixi-display](https://github.com/pixijs/pixi-display) : 59999bc9b4a4fe9ed739f6d7b17ba4c69068204f - Apr 11, 2018
- [pixi-particles](https://github.com/pixijs/pixi-particles) 3.0.0
- [pixi-filters](https://github.com/pixijs/pixi-filters) 2.6.1
- [pixi-spine](https://github.com/pixijs/pixi-spine) 1.5.16 ***

### Other 3rd party libs
- [screenfull](https://github.com/sindresorhus/screenfull.js/) 3.3.2
- [fpsmeter](https://github.com/darsain/fpsmeter) 0.3.1
- [eventemitter3](https://github.com/primus/eventemitter3) 3.1.0
- [gsap](https://github.com/greensock/GreenSock-JS) 2.0.1
- [howler.js](https://github.com/goldfire/howler.js) 2.0.12
- [typescript-collections](https://github.com/basarat/typescript-collections) 3758b3bea35f17d2c86c56b9110666d7b80609f2

### Prerequisites

Install Node & NPM from [here](https://www.npmjs.com/get-npm) or using [NVM](https://github.com/creationix/nvm)

### Installing

Install NPM dependencies by running.

```
npm install
```
 
## Initial Steps

- Test it by running and browsing to [localhost:9000](http://localhost:9000/) 

```
npm run build && npm run serve
```
Note that pixi.js is kept as a external dependency and it is not bundled within the application.

## NPM scripts

- clean - [removes](https://github.com/isaacs/rimraf) dev, dist and doc dirs
- build - compiles and copy all the assets to dev dir
- build:release - compiles and [uglifies](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) to dist dir
- rebuild:all - cleans and rebuilds dev, dist and doc. 
- serve - serves (0.0.0.0:9000) dev dir with Hot Module Replacement enabled through [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- serve:release - serves (0.0.0.0:9999) dist dir through [http-server](https://github.com/indexzero/http-server) to test production bundle
- test - does nothing right now
- doc - generate app doc with [typedoc](http://typedoc.org/)
- start - runs build & serve

## Authors

* **Nedelcu Petrica Bogdan**

## Boiler plate - Pixi
This project was built on an existing boiler plate : https://github.com/dacaher/pixijs-ts-boilerplate
