# inspiral-web

The web version of the [Inspiral app](https://inspiral.nathanfriend.io/).
Written in TypeScript, using D3.js.
[nathanfriend.io/inspiral-web/](https://nathanfriend.io/inspiral-web/)

## Building

1. install Node.js
   - ~~note: this project only seems to build correctly with version 5 and
     lower, due to this
     issue:https://github.com/cgross/grunt-dom-munger/issues/42. Removing the
     `isPath` parameter makes the build produce incorrect results.~~ a. I got
     around this issue by hacking in [this
     PR](https://github.com/cgross/grunt-dom-munger/pull/45/files) in
     `InspiralWeb/node_modules/grunt-dom-munger/tasks/dom_munger.js`
1. install Grunt and Bower
1. run `npm install` and `bower install` inside `InspiralWeb/` directory
1. run `bower install` inside the `InspiralWeb/gallery` directory
1. change the value `@fa-font-path` in
   `/bower_components/fontawesome/less/variables.less` from `../fonts` to `./`
   - do the same for the `bower_components` directory in `/gallery`
1. ~~install WebEssentials VS plugin~~
1. run `npm run build-scripts`
1. Install [`http-server`](https://www.npmjs.com/package/http-server) globally
   and run `http-server` inside the `/InspiralWeb` directory
1. create a distribution build, run `grunt` inside the `InspiralWeb/` directory

### Here be dragons

There are some seriously terrible things about this codebase:

1. A number of the original `*.ts` files are missing, but the compiled `*.js`
   files still exist. I'm not sure how this happened :shrug:
1. I haven't invested time into figuring out how to compile the LESS (it used to
   be done automatically by the VS extension), so currently there's no way to
   make style changes to the app. I gave this a shot with the `build-styles` npm
   scripts, but they're not yet working. For now - just don't touch
   `app.min.css`.

## Publishing

1. after building (see above), run `npm publish` from the `./dist/` directory a.
   don't run this command from the `InspiralWeb/` directory!
