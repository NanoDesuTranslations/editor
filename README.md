## Nanodesu Translation Editor
Official Admin / Back-End Website of Nanodesu Translations build with AngularJS Framework version 1.5.8 and many other Libraries.

### Tools
1. Node Package Manager (NPM)
2. Bower
3. Grunt

### How to Build
1. Make sure to install all dependencies, execute: `npm install`.
2. Run Grunt Task: `grunt build`.
3. The Final file was in `public/`.

### How to Develop
* Because the Gruntfile is still _sucks_ yes we have to inde.html file. So, make sure to change `index_dev.html` into `index.html` and change `index.html` into `index_prod.html` as backup (Yes need to think better solutions).
* Don't forget to activate `compileProvider` & `logProvider` in `app/app.js` before build the source to make sure is ready for production
