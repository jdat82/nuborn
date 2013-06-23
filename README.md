Nuborn
======

Nuborn is a phonegap and web mobile boilerplate project based on `Phonegap`, `jQuery Mobile`, `jQuery` and `Grunt`.

Its goal is to provide a good base when starting a new project with an operative and complete build which can handle several platform and modern technologies needs : 
 * javascript compilation and obfuscation, 
 * hogan templates compilation
 * scss compilation and compression, 
 * html compression, 
 * images optimizations etc.
 * watch for changes and rebuild automatically
 * launch a simple and fast little web server for easy testing without configuration
 * javascript documentation
 * etc.

Nuborn is a forge based on grunt.

But it is also a compilation of classic components like : 
 * splashscreen,
 * session timeout detection,
 * page events handling,
 * some utility methods (platform detection, etc.)
 * i18n manipulation (load a JSON bundle, get messages and replace placeholders, etc.)
 * url handling
 * etc.

Nuborn components don't intend to be state of the arts solution for the problem they solve. 
They are simple and light javascript code, sufficient enough for simple and recurrent needs.
No specialized and powefull framework for each problem/solution.

We try to create our perfect ligth boilerplate project.


Building Nuborn
===============

Nuborn grunt build is globally standard and easy to understand. We used these plugins :
 * `grunt-contrib-uglify` for javascript compilation
 * `grunt-contrib-sass` for scss compilation
 * `grunt-hogan` for hogan templates compilation
 * `grunt-contrib-htmlmin` for html optimizations
 * `grunt-contrib-imagemin` for image optimizations
 * `grunt-contrib-watch` to watch for changes in source code and hot redeploy (livereload enabled)
 * `grunt-contrib-connect` for easy deployment under a web server
 * `grunt-devtools` to stay in the browser
 * `grunt-jsduck` to generate javascript documentation (sencha docs style)

Most of grunt tasks have one target per platform. 
You can easily add or remove platforms by adding/removing targets in each task configuration and declaring them in platforms configuration.

Finding dependencies automatically
----------------------------------

For javascript and sass compilation, we created a wrapper task for each one because we like files to be sorted automatically based on dependencies.
Neither uglify nor sass were able to do it. Closure compiler was not a solution has it is too slow and doesn't handle defines.

So the uglify task configuration is called nuglify and the sass one, nsass. They are strictly identical to the original ones.
The only difference is that at build time, we use a custom algorithm to compute and sort files according to their dependencies before
sending the configuration to uglify and sass.

In javascript and scss files, you can use a comment like this to use it :
```
/**
 * @provide my-cmponent
 * @require some-other-component
 */
```

You can only have 1 provide per source file.
You can have several require per source file.
You can dispatch them on several comments if you like. 
At the end, you need to have a provide declared for every require.

Juggling with several platforms
-------------------------------

When coding we prefer to build only one target to accelerate build time. 
So we added a little hook enabled for every task so as to only active platforms are build.

So if you have a configuration like this :
```
platforms: {
	android: {
		folder: "build/android/assets/www",
		active: false
	},
	ios: {
		folder: "build/ios/www",
		active: false
	},
	web: {
		folder: "build/web",
		active: true
	}
 }
```

Typing ```grunt nuglify``` will be replaced by ```grunt nuglify:web``` as it is the only active platform.

Managing development and production configurations
--------------------------------------------------

As each grunt task has already a target per platform, we managed production and development configurations with external files in the `conf` folder.
There is actually two configurations files : prod.json and dev.json.

Their loading is based on the profile option.
Just provide a `--profile=dev` or `--profile=prod` param at build time to enable one of them.
Theirs contents will be loaded into an options variable that you can use directly.

```
nuglify: {
	options: {
		compress: options.js.compress,
		beautify: options.js.beautify,
		report: options.js.report
	},
	...
```

Coding with Nuborn
==================



Authors
-------

 * [Jean Dat](jan4dev@gmail.com), 
 * [Jimmy Robert](rob.jimmy@gmail.com),
 * [David Tisserand](babidyxp@gmail.com)
