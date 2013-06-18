/**
 * Grunt Configuration
 */
 module.exports = function(grunt) {

	// externals options which can be context dependent
	var profile = grunt.option("profile") || "dev"
	var options = grunt.file.readJSON("conf/" + profile + ".json")

	grunt.initConfig({

		/**
		 * Definition of build targets. 
		 */
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
		 },

		/**
		 * Common javascript files for all  platforms
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

		 "concat-js": {
			test: {
				files: {
					"build": [ "<%=js%>" ],
					".": [ "Gruntfile.js" ]
				}
			},
			ios: {

			}
		 },

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
					"<%= platforms.web.folder %>/js/app.min.js": ["<%= js %>"]
				}
			},
			android: {
				files: {
					"<%= platforms.android.folder %>/js/app.min.js": ["libs/Cordova/cordova.android.js", "<%= js %>"]
				}
			},
			ios: {
				files: {
					"<%= platforms.ios.folder %>/js/app.min.js": ["libs/Cordova/cordova.ios.js", "<%= js %>"]
				}
			}
		 },

		/**
		 * Common css files for all platforms
		 */
		 css: [
		 "libs/jQueryMobile/*.css", /** jQuery Mobile is required **/
		 "libs/Nuborn/sass/mixins.scss",
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
					"<%= platforms.android.folder %>/css/app.min.css": ["<%= css %>"]
				}
			},
			ios: {
				files: {
					"<%= platforms.ios.folder %>/css/app.min.css": ["<%= css %>"]
				}
			},
			web: {
				files: {
					"<%= platforms.web.folder %>/css/app.min.css": ["<%= css %>"]
				}
			}
		 },

		/**
		 * HTML files common to all platforms.
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
				{ dest: "<%= platforms.android.folder %>/", src: ["<%= html %>"], expand: true, flatten: true }
				]
			},
			ios: {
				files: [
				{ dest: "<%= platforms.ios.folder %>/", src: ["<%= html %>"], expand: true, flatten: true }
				]
			},
			web: {
				files: [
				{ dest: "<%= platforms.web.folder %>/", src: ["<%= html %>"], expand: true, flatten: true }
				]
			}
		 },

		/**
		 * Image files common to all platforms.
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
				{ dest: "<%= platforms.android.folder %>/images/", src: ["<%= img %>"], expand: true, flatten: true }
				]
			},
			ios: {
				files: [
				{ dest: "<%= platforms.ios.folder %>/images/", src: ["<%= img %>"], expand: true, flatten: true }
				]
			},
			web: {
				files: [
				{ dest: "<%= platforms.web.folder %>/images/", src: ["<%= img %>"], expand: true, flatten: true }
				]
			}
		 },

		/**
		 * Finally static resources common to all platforms.
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
				{ dest: "<%= platforms.android.folder %>/", src: ["<%= fonts %>"], expand: true }
				]
			},
			ios: {
				files: [
				{ dest: "<%= platforms.ios.folder %>/", src: ["<%= fonts %>"], expand: true }
				]
			},
			web: {
				files: [
				{ dest: "<%= platforms.web.folder %>/", src: ["<%= fonts %>"], expand: true }
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
				src: ["<%= platforms.android.folder %>/*"]
			},
			ios: {
				src: ["<%= platforms.ios.folder %>/*"]
			},
			web: {
				src: ["<%= platforms.web.folder %>/*"]
			}
		 },

		/*
		 * Rebuild on every save.
		 */
		 watch: {
			options: {
				nospawn: true,
				livereload: true
			},
			scss: {
				files: "<%= css %>",
				tasks: ["sass"]
			},
			js: {
				files: "<%= js %>",
				tasks: ["uglify"]
			},
			htmlmin: {
				files: "<%= html %>",
				tasks: ["htmlmin"]
			}
		 }

	})

	// Loading grunt plugins
	grunt.loadNpmTasks('grunt-jsduck')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-sass')
	grunt.loadNpmTasks('grunt-contrib-htmlmin')
	grunt.loadNpmTasks('grunt-contrib-imagemin')
	grunt.loadNpmTasks('grunt-contrib-copy')
	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-watch')
	//grunt.loadNpmTasks('grunt-devtools')

	// Registering Default Task
	grunt.registerTask("default", [ "uglify", "sass", "htmlmin", "imagemin", "copy" ])

	// Registering one alias per target to allow compiling only one target
	grunt.registerTask("android", [ "uglify:android", "sass:android", "htmlmin:android", "imagemin:android", "copy:android" ])
	grunt.registerTask("ios", [ "uglify:ios", "sass:ios", "htmlmin:ios", "imagemin:ios", "copy:ios" ])
	grunt.registerTask("web", [ "uglify:web", "sass:web", "htmlmin:web", "imagemin:web", "copy:web" ])

	/**
	 * Receive a task name and if no target specified find active targets and execute the active ones.
	 * It is assumed that a task has only platform dependent targets.
	 * If a task has a target per platform plus some others targets, they will be ignored as
	 * no behavior can be assumed. 
	 * You may enrich this by executing the non-platform dependent targets for each platform target,
	 * or before them, or after them, etc.
	 *
	 * @return true if task need to be preempted in order to execute platform dependent targets only. 
	 * False else.
	 */
	 function executeTaskForActiveTargetsOnly(task)
	 {
		var platforms = activeTargets(grunt)

		// if task isn't related to any platform, no preempting
		if (!isPlatformDependent(task))
			return false

		var taskConfiguration = grunt.config(task)

		// if a configuration exists for each active platform, preempts the default behavior by executing only
		// these ones
		platforms.forEach(function(platformName) {
			// if we found a configuration for that platform, we use it
			if(taskConfiguration[platformName])
				grunt.task.run(task + ":" + platformName)
		})

		// task is platform dependent so it is preempted
		return true
	}

	/**
	 * Compute an array of active target names.
	 */
	 function activeTargets()
	 {
		var platforms = grunt.config("platforms")
		var result = []

		if (!platforms)
			return result

		for (var targetName in platforms)
			if (platforms[targetName].active)
				result.push(targetName)

		return result
	}

	/**
	 * Return true if task's configuration is platform dependent.
	 */
	function isPlatformDependent(task)
	{
		var platforms = grunt.config("platforms")
		var taskConfiguration = grunt.config(task);

		if(!taskConfiguration || !platforms || !platforms.length)
			return false

		platforms.forEach(function(platform) {
			if(taskConfiguration[platform])
				return true
		})

		return false
	}

	var hooker = grunt.util.hooker

	/**
	 * Hook that intercept calls to grunt.task.run so as to execute the task for active platforms only.
	 */
	 hooker.hook(grunt.task, "run", {
		pre: function(task) {

			// if there is already a target specified, no hook
			if(task.match(/:/g))
				return;

			if(executeTaskForActiveTargetsOnly(task)) 
				return grunt.util.hooker.preempt(true)
		}
	})

	// hooker.hook(grunt.task, "run", {
	// 	pre: function(task) {

	// 		grunt.log.writeln("this: " + JSON.stringify(this))
	// 		grunt.log.writeln("arguments: " + JSON.stringify(arguments))

	// 		if(task.match(/:/g)){
	// 			grunt.log.writeln("task: " + task)
	// 			task = task.replace(":", ".")
	// 			grunt.log.writeln("task: " + task)
	// 		}
	// 		var conf = grunt.config(task)
	// 		grunt.log.writeln("conf: " + JSON.stringify(conf))
	// 		var options = grunt.option(task)
	// 		grunt.log.writeln("options: " + JSON.stringify(options))

	// 	}
	// })

	grunt.registerMultiTask("concat-js", "", function(){
		grunt.log.writeln("this: " + JSON.stringify(this))
		grunt.log.writeln("")
		grunt.log.writeln("arguments: " + JSON.stringify(arguments))
		grunt.log.writeln("")
		grunt.log.writeln("this.options(): " + JSON.stringify(this.options()))
		grunt.log.writeln("")
	})

}