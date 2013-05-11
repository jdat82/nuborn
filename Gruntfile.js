/**
 * Grunt Configuration
 */
module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-jsduck');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.initConfig({
		 htmlmin: { 
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'cell.hogan': 'src/pages/home/templates/cell.hogan'
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
					"ios": true,
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
							"src/**/*.js",
							"!src/app/mobileinit.js"
						],

						/**
						 * Override Grunt Closure Compiler Options
						 * https://github.com/gmarty/grunt-closure-compiler#options-properties
						 *
						 * Default options are :
						 *  -- compilation_level : SIMPLE_OPTIMIZATIONS
						 */
						options: {
							"formatting": "PRETTY_PRINT"
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
							"libs/Hogan/*.js",
							"libs/jQuery/*.js", /** jQuery is required **/
							"src/app/mobileinit.js", 
							"libs/jQueryMobile/*.js", /** jQuery Mobile is required **/
							"libs/Inheritance/*.js", /** Inheritance is required **/
							"libs/jQueryJSON/*.js", /** jQueryJSON is required for old browser **/
							"libs/Nuborn/*.js", /** Nuborn is required **/
							"libs/SwipeJS/*.js"
						],

						options: {
							"formatting": "PRETTY_PRINT"
						},
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
							"libs/Nuborn/sass/mixins.scss",
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
							style : "expanded"
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
						buildNubornFirst: false,
						/**
						 * Files to compile for the libs
						 */
						patterns:[
							"libs/jQueryMobile/*.css", /** jQuery Mobile is required **/
							"libs/Nuborn/*.css", /** Nuborn is required **/
							"libs/SwipeJS/*.scss"
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
					/**
					 * Application Configuration
					 */
					app: {

						patterns: [
							"src/**/*.html",
							"!src/**/templates/*.html"
						],

						android: {
							output: "assets/www"

						},

						ios: {
							output: "www/"
						},

						web: {

						}
					},
					/**
					 * Libraries Configuration
					 */
					libs: {

					}
				},
				/**
				 * Templates Configuration
				 */
				templates: {	
					/**
					 * Application Configuration
					 */
					app: {

						patterns: [
							"src/**/templates/*.hogan"
						],

						options : {

						}

					},
					/**
					 * Libraries Configuration
					 */
					libs: {

					}
				}
			}
		},
		/**
		 * Documentation
		 */
		jsduck:{
			/**
			 * App Documentation
			 */
			app: {
				src: [
					"src/",
					"libs/Nuborn/"
				],
				dest: "docs/App",
				options:{
					// 'builtin-classes': true,
					"title": "Nuborn Application",
					"footer": "IT&L@bs Toulouse - Mobile team"
				}
			},
			/**
			 * Nuborn Documentation
			 */
			nuborn: {
				src: [
					"libs/Nuborn/"
				],
				dest: "docs/Nuborn",
				options:{
					"title": "Nuborn - framework for hybrid & web mobile apps",
					"footer": "IT&L@bs Toulouse - Mobile team"
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
		var path = require("path");
		for(var key in path){
			grunt.log.writeln(key);
		}
		//grunt.task.run("nuborn");
	});

};