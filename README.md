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

#### Development
1. IMPORTANT: Make sure to replace `index.html` with `index_dev.html` (Just rename `index.html` into `index_backup.html` or whatever. Then Rename `index_dev.html` into `index.html`.
2. Upload all files in directory into API / Server include folders `bower_components/` and `node_modules/`.
