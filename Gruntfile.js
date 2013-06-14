/**
 * Grunt Configuration
 */
module.exports = function(grunt) {

	// externals options which can be context dependent
	var profile = grunt.option("profile") || "prod";
	var options = grunt.file.readJSON(profile + ".json");

	grunt.initConfig({

		/**
		 * Definition of build targets. 
		 */
		targets: {
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
		},

		/**
		 * If true, will compile only this target instead all of them.
		 * Authorized values are one of targets property or empty string to build all targets.
		 * Reused by other tasks.
		 */
		// singleTarget: "",

		/**
		 * Common javascript files for all  targets
		 */
		js: [
				"libs/Hogan/*.js",
				"libs/jQuery/*.js", /** jQuery is required **/
				"src/app/mobileinit.js",
				"libs/jQueryMobile/*.js", /** jQuery Mobile is required **/
				"libs/Inheritance/*.js", /** Inheritance is required **/
				"libs/jQueryJSON/*.js", /** jQueryJSON is required for old browser **/
				"libs/Nuborn/**/*.js", /** Nuborn is required **/
				"libs/SwipeJS/*.js",
				"src/**/*.js"
		],

		/**
		 * Javascript compilation
		 */
		uglify: {
			options: {
				compress: options.js.compress,
				beautify: options.js.beautify,
				report: options.js.report
			},
			web: {
				files: {
					"<%= targets.web.folder %>/js/app.min.js": ["<%= js %>"]
				}
			},
			android: {
				files: {
					"<%= targets.android.folder %>/js/app.min.js": ["libs/Cordova/cordova.android.js", "<%= js %>"]
				}
			},
			ios: {
				files: {
					"<%= targets.ios.folder %>/js/app.min.js": ["libs/Cordova/cordova.ios.js", "<%= js %>"]
				}
			}
		},

		/**
		 * Common css files for all targets
		 */
		css: [
				"libs/jQueryMobile/*.css", /** jQuery Mobile is required **/
				"libs/Nuborn/sass/*.scss",
				"libs/SwipeJS/*.scss",
				"src/**/*.scss"
		],

		/**
		 * CSS compilation
		 */
		sass: {
			options: {
				style: options.css.style,
				noCache: options.css.noCache
			},
			android: {
				files: {
					"<%= targets.android.folder %>/css/app.min.css": ["<%= css %>"]
				}
			},
			ios: {
				files: {
					"<%= targets.ios.folder %>/css/app.min.css": ["<%= css %>"]
				}
			},
			web: {
				files: {
					"<%= targets.web.folder %>/css/app.min.css": ["<%= css %>"]
				}
			}
		},

		/**
		 * HTML files common to all targets.
		 */
		html: [
			"src/**/*.html",
			"!src/**/templates/*.html"
		],

		/**
		 * HTML minification
		 */
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true
			},
			android: {
				files: [
					{ dest: "<%= targets.android.folder %>/", src: ["<%= html %>"], expand: true, flatten: true }
				]
			},
			ios: {
				files: [
					{ dest: "<%= targets.ios.folder %>/", src: ["<%= html %>"], expand: true, flatten: true }
				]
			},
			web: {
				files: [
					{ dest: "<%= targets.web.folder %>/", src: ["<%= html %>"], expand: true, flatten: true }
				]
			}
		},

		/**
		 * Image files common to all targets.
		 */
		img: [
			"src/**/images/*"
		],

		/**
		 * Images optimisationq
		 */
		imagemin: {
			options: {
				optimizationLevel: 3
			},
			android: {
				files: [
					{ dest: "<%= targets.android.folder %>/images/", src: ["<%= img %>"], expand: true, flatten: true }
				]
			},
			ios: {
				files: [
					{ dest: "<%= targets.ios.folder %>/images/", src: ["<%= img %>"], expand: true, flatten: true }
				]
			},
			web: {
				files: [
					{ dest: "<%= targets.web.folder %>/images/", src: ["<%= img %>"], expand: true, flatten: true }
				]
			}
		},

		/**
		 * Finally static resources common to all targets.
		 */
		fonts: [
			"fonts/*",
		],

		/**
		 * Let's copy some static files.
		 */
		copy: {
			android: {
				files: [
					{ dest: "<%= targets.android.folder %>/", src: ["<%= fonts %>"], expand: true }
				]
			},
			ios: {
				files: [
					{ dest: "<%= targets.ios.folder %>/", src: ["<%= fonts %>"], expand: true }
				]
			},
			web: {
				files: [
					{ dest: "<%= targets.web.folder %>/", src: ["<%= fonts %>"], expand: true }
				]
			}	
		},

		/*
		 * Documentation
		 */
		jsduck: {
			app: {
				options: {
					"builtin-classes": true,
					"title": "Nuborn documentation",
					"footer": "IT&L@bs Toulouse - Mobile team"
				},
				src: ["src/", "libs/Nuborn/"],
				dest: "docs/"
			}
		},

		/*
		 * Empty the build folder
		 */
		clean: {
			android: {
				src: [ "<%= targets.android.folder %>/*" ]
			},
			ios: {
				src: [ "<%= targets.ios.folder %>/*" ]
			},
			web: {
				src: [ "<%= targets.web.folder %>/*" ]
			}
		},

		/*
		 * Rebuild on every save.
		 * If property "singleTarget" is setted, rebuild only for that target.
		 */
		watch: {
			options: {
				nospawn: true,
				livereload: true
			},
			scss: {
				files: grunt.config("css"),
				tasks: createDynamicTasks("sass")
			},
			js: {
				files: grunt.config("js"),
				tasks: createDynamicTasks("uglify")
			},
			htmlmin: {
				files: grunt.config("html"),
				tasks: createDynamicTasks("htmlmin")
			}
		}
	});

	// Loading grunt plugins
	grunt.loadNpmTasks('grunt-jsduck');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');


	/*
	 * Typing grunt will execute these tasks for the active targets.
	 * See targets property at the beginning of the file.
	 */
	// grunt.registerTask("default", "default action", function()
	// {
	// 	var defaultTasks = [ "uglify", "sass", "htmlmin", "imagemin", "copy" ];
	// 	var singleTarget = grunt.config("singleTarget");
	// 	if(singleTarget)
	// 	{
	// 		grunt.log.writeln("Building target: " + singleTarget);
	// 		var tasks = [];
	// 		defaultTasks.forEach(function(task){
	// 			tasks.push(task + ":" + singleTarget)
	// 		});
	// 	}
	// 	grunt.task.run(tasks ? tasks : defaultTasks);
	// });

	// Registering Default Task
	grunt.registerTask("default", [ "uglify", "sass", "htmlmin", "imagemin", "copy" ]);

	// Registering one alias per target to allow compiling only one target
	grunt.registerTask("android", [ "uglify:android", "sass:android", "htmlmin:android", "imagemin:android", "copy:android" ]);
	grunt.registerTask("ios", [ "uglify:ios", "sass:ios", "htmlmin:ios", "imagemin:ios", "copy:ios" ]);
	grunt.registerTask("web", [ "uglify:web", "sass:web", "htmlmin:web", "imagemin:web", "copy:web" ]);

	/**
	 * Create a dynamic array of tasks based on the current active targets.
	 * So, calling createDynamicTasks("sass") with android and ios as active targets, will return :
	 * [ "sass:android", "sass:ios" ]
	 */
	function createDynamicTasks(task)
	{
		var tasks = [];
		var targets = grunt.config("targets");
		if(!targets) return [ task ];

		for(var target in targets)
		{
			if(target.active) {
				tasks.push(task + ":" + target);
			}
		}

		var result = tasks ? tasks : [ task ];
		grunt.log.writeln("watch result: " + JSON.stringify(result));
		return result;
	}	
};