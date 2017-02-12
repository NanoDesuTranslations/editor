## Nanodesu Translation Editor
Official Admin / Back-End Website of Nanodesu Translations build with AngularJS Framework version 1.5.8 and many other Libraries.

### Tools
1. [Node Package Manager (NPM)](https://www.npmjs.com/)
2. [Bower](https://bower.io/)
3. [Grunt](http://gruntjs.com/)
4. [Grunt CLI](https://www.npmjs.com/package/grunt-cli)

### How to
After pull / clone the code make sure to download all dependencies, run command:

* `npm install`
* `bower install`

_Note:_ command `bower install` is optional if we execute `npm install`, because `npm install` will automatically execute `bower install` in the end.

#### Production
1. Execute `grunt build`.
2. Final code was in `public/`.
3. Upload all files in `public/` into API / Server.
