/**
 * Grunt Configuration
 */
module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-jsduck');

	grunt.initConfig({
		jsduck:{
			nuborn: {
				src: [
					"libs/Nuborn/"
				],
				dest: [
					"docs/Nuborn"
				],
				options:{
					"title": "Nuborn - framework for hybrid & web mobile apps",
					"footer": "IT&L@bs Toulouse - Mobile team"
				}
			}
		},
		/**
		 * Nuborn Configuration
		 */
		nuborn: {
			classic: {
				/**
				 * Targets configuration
				 */
				targets:{
					"android": true,
					"ios": false,
					"web": true
				},
				/**
				 * Javascript (Closure compiler) configuration
				 */
				javascript: {
					/**
					 * Application Configuration
					 */
					app:{

						/**
						 * Files to compile for the app
						 * Support Globbing Patterns of Grunt
						 * http://gruntjs.com/configuring-tasks#globbing-patterns
						 */
						patterns:[
							"src/**/*.js"
						],

						/**
						 * Override Grunt Closure Compiler Options
						 * https://github.com/gmarty/grunt-closure-compiler#options-properties
						 *
						 * Default options are :
						 *  -- compilation_level : SIMPLE_OPTIMIZATIONS
						 */
						options: {
							
						},

						/**
						 * Android Specific configuration
						 */
						android:{
							output:"assets/www/js/app.min.js"
						},

						/**
						 * iOS Specific configuration
						 */
						ios:{
							output:"www/js/app.min.js"
						},

						/**
						 * Web Specific configuration
						 */
						web:{
							output:"js/app.min.js"
						}
					},
					/**
					 * Libraries Configurations
					 */
					libs:{
						/**
						 * Tells if a build of Nuborn is Needed
						 */
						buildNubornFirst: true,
						/**
						 * Files to compile for the libs
						 */
						patterns:[
							"libs/jQuery/*.js", /** jQuery is required **/
							"libs/jQueryMobile/*.js", /** jQuery Mobile is required **/
							"libs/Inheritance/*.js", /** Inheritance is required **/,
							"libs/jQueryJSON/*.js", /** jQueryJSON is required for old browser **/
							"libs/Nuborn/*.js" /** Nuborn is required **/
						],
						/**
						 * Android Specific Configuration
						 */
						android:{
							output:"assets/www/js/libs.min.js",
							patterns:[
								"libs/Cordova/cordova.android.js" /** Include Cordova for Android **/
							]
						},
						/**
						 * iOS Specific Configuration
						 */
						ios:{
							output:"www/js/libs.min.js",
							patterns:[
								"libs/Cordova/cordova.ios.js" /** Include Cordova for iOS **/
							]
						},
						/**
						 * Web Specific Configuration
						 */
						web:{
							output:"js/libs.min.js"
						}
					}
				},
				/**
				 * CSS (SASS) Configuration
				 */
				css:{
					/**
					 * Application Configuration
					 */
					app:{

						/**
						 * Files to compile for the app
						 * 
						 * Support Globbing Patterns of Grunt
						 * http://gruntjs.com/configuring-tasks#globbing-patterns
						 */
						patterns:[
							"src/**/*.scss"
						],

						/**
						 * Override Grunt SASS Options
						 * https://github.com/gmarty/grunt-closure-compiler#options-properties
						 * 
						 * Default Options are :
						 *  -- style : compressed 
						 *  -- noCache : true
						 */
						options: {
							
						},

						/**
						 * Android Specific configuration
						 */
						android:{
							output:"assets/www/css/app.min.css"
						},

						/**
						 * iOS Specific configuration
						 */
						ios:{
							output:"www/css/app.min.css"
						},

						/**
						 * Web Specific configuration
						 */
						web:{
							output:"css/app.min.css"
						}
					},
					/**
					 * Libraries Configurations
					 */
					libs:{
						/**
						 * Tells if a build of Nuborn is Needed
						 */
						buildNubornFirst: true,
						/**
						 * Files to compile for the libs
						 */
						patterns:[
							"libs/jQueryMobile/*.css", /** jQuery Mobile is required **/
							"libs/Nuborn/*.css" /** Nuborn is required **/
						],
						/**
						 * Android Specific Configuration
						 */
						android:{
							output:"assets/www/css/libs.min.css"
						},
						/**
						 * iOS Specific Configuration
						 */
						ios:{
							output:"www/css/libs.min.css",
						},
						/**
						 * Web Specific Configuration
						 */
						web:{
							output:"css/libs.min.css",
						}
					}
				},
				/**
				 * HTML Configuration
				 */
				html:{

				}
			}
		}
	});

	/**
	 * Loading Tasks
	 */
	grunt.loadNpmTasks('grunt-nuborn');

	/**
	 * Registering Default Task
	 */
	grunt.registerTask("default", function() {
		grunt.task.run("nuborn");
	});

	grunt.registerTask("scss", function(){
		grunt.log.writeln("Building CSS");
		// read user config for sass
		var sassConfiguration = grunt.file.readJSON("config/sass.json");
		// get the app configuration
		var app = sassConfiguration.app;
		// if app is not defined, stop process
		if(!app){
			grunt.log.error("No app configuration is provided in sass.json");
			return false;
		}
		// if no target is provided, stop process
		if(!app.targets){
			grunt.log.writeln("There is not any target");
			return true;
		}

		var android = app.targets.android;
		var ios = app.targets.ios;
		var web = app.targets.web;

		// if all targets are excluded, stop process
		if(!android && !ios && !web){
			grunt.log.writeln("All targets are excluded");
			return true;
		}

		// init new config for grunt
		var config = {};

		var sass = {};
		config.sass = sass;

		var target = {};

		target.files = {};

		var options = {};
		target.options = options;

		options.style = "compressed";
		options.noCache = true;

		var output = app.output ? app.output : "app.min.css";
		
		// first define the first files to compile (files containing variables, mixins declarations, etc)
		var sources = app.mainFiles ? app.mainFiles : [];
		// then add all scss files
		sources.push("src/**/*.scss");
		// exclude all files in the exclude patterns array of closure config
		if(app.excludePatterns){
			var excludes = app.excludePatterns;
			for(var i = 0, length = excludes.length; i < length; i++){
				sources.push("!"+excludes[i]);
			}
		}

		var separate = false;
		separate = separate || (app.android && app.android.options);
		separate = separate || (app.ios && app.ios.options);
		separate = separate || (app.web && app.web.options);

		if(separate){
			if(android){
				sass.android = grunt.buildSassTarget("android", target, sources, output, sassConfiguration);
			}
			if(ios){
				sass.ios = grunt.buildSassTarget("ios", target, sources, output, sassConfiguration);
			}
			if(web){
				sass.web = grunt.buildSassTarget("web", target, sources, output, sassConfiguration);
			}

			grunt.config.init(config);
			grunt.task.run("sass");
		} else {
			// get the timestamp to avoid conflicts
			var suffix = new Date().getTime();
			// create the temp folder
			grunt.file.mkdir("build/sass"+suffix);
			// build one and copy
			sass.target = grunt.buildSassTarget("sass"+suffix, target, sources, output, sassConfiguration);
			// initialize grunt configuration
			grunt.config.init(config);
			// run sass compiler 
			grunt.task.run("sass");

			if(android){
				var androidOutput = app.android && app.android.output ? app.android.output : output;
				grunt.task.run("copy:build/sass"+suffix+"/"+output+":build/android/"+androidOutput);
			}
			if(ios){
				var iosOutput = app.ios && app.ios.output ? app.android.output : output;
				grunt.task.run("copy:build/sass"+suffix+"/"+output+":build/ios/"+iosOutput);
			}
			if(web){
				var webOutput = app.web && app.web.output ? app.web.output : output;
				grunt.task.run("copy:build/sass"+suffix+"/"+output+":build/web/"+webOutput);
			}

			grunt.task.run("delete:build/sass"+suffix);
		}
		
	});

	// grunt.buildSassTarget = function(targetName, parent, sources, output, configuration){
	// 	var target = grunt.clone(parent);

	// 	var targetSources = [].concat(sources);
	// 	// treat target specific configuration
	// 	if(configuration.app[targetName]){
	// 		var targetConfiguration = configuration.app[targetName];
	// 		var options = targetConfiguration.options || {};
	// 		// treat target specific main files
	// 		if(options.mainFiles){
	// 			targetSources = options.mainFiles.concat(targetSources);
	// 		}

	// 		// treat target specific exclude patterns
	// 		if(options.excludePatterns){
	// 			var excludes = options.excludePatterns;
	// 			for(var i = 0, length = excludes.length; i < length; i++){
	// 				targetSources.push("!"+excludes[i]);
	// 			}
	// 		}

	// 		// treat target specific output file
	// 		if(targetConfiguration.output){
	// 			target.files["build/"+targetName+"/"+targetConfiguration.output] = targetSources;
	// 		} else {
	// 			target.files["build/"+targetName+"/"+output] = targetSources;
	// 		}
			
	// 	} else {
	// 		target.files["build/"+targetName+"/"+output] = targetSources;
	// 	}
	// 	return target;
	// };

	/*grunt.registerTask("nuborn", function(){
		grunt.log.writeln("Building Nuborn framework with libraries");
	});*/
};