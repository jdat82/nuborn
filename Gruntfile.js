var GruntUtils = require("./GruntUtils")

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

		/**
		 * Javascript compilation
		 */
		 nuglify: {
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
		 "libs/**/*.scss",
		 "src/**/*.scss"
		 ],

		/**
		 * CSS compilation
		 */
		 nsass: {
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
		 * Image files common to all platforms
		 */
		 img: [
		 "src/**/images/*"
		 ],

		/**
		 * Images optimisations
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
				nospawn: false,
				livereload: true
			},
			scss: {
				files: "<%= css %>",
				tasks: ["nsass"]
			},
			js: {
				files: "<%= js %>",
				tasks: ["nuglify"]
			},
			htmlmin: {
				files: "<%= html %>",
				tasks: ["htmlmin"]
			}
		 },

		 connect: {
		 	server: {
		 		options: {
		 			port: 9001,
		 			base: 'build/web',
		 			keepalive: true
		 		}
		 	}
		 }

	})


	/**
	 * Loading grunt plugins
	 */
	grunt.loadNpmTasks('grunt-jsduck')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-sass')
	grunt.loadNpmTasks('grunt-contrib-htmlmin')
	grunt.loadNpmTasks('grunt-contrib-imagemin')
	grunt.loadNpmTasks('grunt-contrib-copy')
	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-devtools')


	/**
	 * Registering Default Task
	 */
	grunt.registerTask("default", [ "nuglify", "nsass", "htmlmin", "imagemin", "copy" ])


	/**
	 * Registering one alias per target to allow compiling only one target
	 */
	grunt.registerTask("android", [ "nuglify:android", "nsass:android", "htmlmin:android", "imagemin:android", "copy:android" ])
	grunt.registerTask("ios", [ "nuglify:ios", "nsass:ios", "htmlmin:ios", "imagemin:ios", "copy:ios" ])
	grunt.registerTask("web", [ "nuglify:web", "nsass:web", "htmlmin:web", "imagemin:web", "copy:web" ])


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
		var activePlatforms = activeTargets(grunt)

		// if task isn't related to any platform, no preempting
		if (!isPlatformDependent(task))
			return false

		// if a configuration exists for each active platform, preempts the default behavior by executing only
		// these ones
		activePlatforms.forEach(function(platform) 
		{
			// getting task and target configuration
			var conf = grunt.config.get(task + "." + platform)

			// if we found a configuration for that platform, we use it
			if(conf) 
			{
				// executing task with correct target
				grunt.task.run(task + ":" + platform)
			}
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
		var taskConfiguration = grunt.config(task)

		if(!taskConfiguration || !platforms || !Object.keys(platforms).length)
			return false

		for(var platform in platforms) {
			if(taskConfiguration[platform])
				return true
		}

		return false
	}

	/**
	 * Hook that intercept calls to grunt.task.run so as to execute the task for active platforms only.
	 */
	grunt.util.hooker.hook(grunt.task, "run", {
		pre: function(task) {

			// grunt.log.writeln("\n\n\n task:" + task + " \n\n\n")

			// if there is already a target specified, no hook
			// specifyng <task>: is also a way to bypass the hook without having target
			if(task.match(/:/g))
				return

			// if task is platform dependent and has active targets : preempt
			if(executeTaskForActiveTargetsOnly(task)) 
				return grunt.util.hooker.preempt(true)
		}
	})

	/**
	 * Booster for sass configuration. Automagically sorts files according to their dependencies.
	 * Strictly identical to grunt-contrib-sass configuration as it is a wrapper for it.
	 * Will create a sass/target configuration and compute the final sorted "files" attribute.
	 * The task is invoked by the above hook for each active platform. Each time, a sass.target
	 * configuration is created.
	 */
	grunt.registerMultiTask("nsass", "wrapper for grunt-contrib-sass", function() 
	{
		// sass config for the current target
		var sass = {
			options: this.options(),
			target: {
				files: []
			}
		}

		// resolving patterns and then dependencies order
		this.files.forEach(function(files) {
			sass.target.files.push({
				src: GruntUtils.resolveDependencies(files.src),
				dest: files.dest
			})
		})

		// registering the sass config for execution
		grunt.config("sass", sass)
		grunt.task.run("sass:")
	})

	/**
	 * Booster for uglify configuration. Automagically sorts files according to their dependencies.
	 * Strictly identical to grunt-contrib-uglify configuration as it is a wrapper for it.
	 * Will create a uglify/target configuration and compute the final sorted "files" attribute.
	 * The task is invoked by the above hook for each active platform. Each time, a uglify.target
	 * configuration is created.
	 */
	grunt.registerMultiTask("nuglify", "wrapper for grunt-contrib-uglify", function() 
	{
		// uglify config for the current target
		var uglify = {
			options: this.options(),
			target: {
				files: []
			}
		}

		// resolving patterns and then dependencies order
		this.files.forEach(function(files) {
			uglify.target.files.push({
				src: GruntUtils.resolveDependencies(files.src),
				dest: files.dest
			})
		})

		// registering the uglify config for execution
		grunt.config("uglify", uglify)
		grunt.task.run("uglify:")
	})


}