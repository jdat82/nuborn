var GruntUtils = require("./GruntUtils");

// --- REVERSE PROXY CONFIGURATION
// --- Used by the connect task
// var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest

/**
 * Grunt Configuration
 */
module.exports = function (grunt)
{

	// externals options which can be context dependent
	var profile = grunt.option("profile") || "dev";
	var options = grunt.file.readJSON("conf/" + profile + ".json");

	grunt.initConfig(
	{

		/**
		 * Definition of build targets.
		 */
		platforms:
		{
			android:
			{
				folder: "build/android/assets/www",
				active: false
			},
			ios:
			{
				folder: "build/ios/www",
				active: false
			},
			web:
			{
				folder: "build/web",
				active: true
			}
		},

		/**
		 * Common javascript files for all  platforms
		 */
		js: [
			"libs/Hogan/*.js",
			"libs/Gsap/plugins/CSSPlugin.min.js", /** Animations */
			"libs/Gsap/easing/EasePack.min.js", /** Animations */
			"libs/Gsap/TweenLite.min.js", /** Animations */
			"libs/Gsap/TimelineLite.min.js", /** Animations */
			"libs/jQuery/*.js", /** jQuery is required **/
			"libs/Modernizr/*.js",
			"src/app/mobileinit.js", /** jQuery Mobile pre-initialization */
			"libs/jQueryMobile/jquery.mobile.custom*.js", /** jQuery Mobile is required **/
			"libs/SwipeJS/*.js",
			// "libs/jQueryJSON/*.js",						/** jQueryJSON is required for old browser **/
			"gen/*.js", /** Generated sources as templates */
			"libs/Nuborn/**/*.js", /** Nuborn is required **/
			"src/**/*.js"
		],

		/**
		 * Javascript compilation
		 */
		nuglify:
		{
			options: options.uglify,
			android:
			{
				// defining an ANDROID constant in order to allow compilation of android specific code
				options:
				{
					"compress": GruntUtils.extend(true,
					{}, options.uglify.compress,
					{
						"global_defs":
						{
							"ANDROID": true,
							"IOS": false,
							"WEB": false
						}
					})
				},
				files:
				{
					"<%= platforms.android.folder %>/js/app.min.js": ["libs/Cordova/cordova.android.js", "<%= js %>"]
				}
			},
			ios:
			{
				// defining an ANDROID constant in order to allow compilation of ios specific code
				options:
				{
					"compress": GruntUtils.extend(true,
					{}, options.uglify.compress,
					{
						"global_defs":
						{
							"ANDROID": false,
							"IOS": true,
							"WEB": false
						}
					})
				},
				files:
				{
					"<%= platforms.ios.folder %>/js/app.min.js": ["libs/Cordova/cordova.ios.js", "<%= js %>"]
				}
			},
			web:
			{
				// defining an ANDROID constant in order to allow compilation of web specific code
				options:
				{
					"compress": GruntUtils.extend(true,
					{}, options.uglify.compress,
					{
						"global_defs":
						{
							"ANDROID": false,
							"IOS": false,
							"WEB": true
						}
					})
				},
				files:
				{
					"<%= platforms.web.folder %>/js/app.min.js": ["<%= js %>"]
				}
			}
		},



		/**
		 * Common teplates for all platforms
		 */
		templates: [
			"libs/Nuborn/**/*.hogan",
			"src/**/*.hogan"
		],


		/**
		 * Templates compilation into javascript
		 */
		hogan:
		{
			android:
			{
				templates: ["<%= templates %>"],
				output: "gen/templates.js",
				binderName: "hulk"
			},
			ios:
			{
				templates: ["<%= templates %>"],
				output: "gen/templates.js",
				binderName: "hulk"
			},
			web:
			{
				templates: ["<%= templates %>"],
				output: "gen/templates.js",
				binderName: "hulk"
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
		nsass:
		{
			options: options.sass,
			android:
			{
				files:
				{
					"<%= platforms.android.folder %>/css/app.min.css": ["<%= css %>"]
				}
			},
			ios:
			{
				files:
				{
					"<%= platforms.ios.folder %>/css/app.min.css": ["<%= css %>"]
				}
			},
			web:
			{
				files:
				{
					"<%= platforms.web.folder %>/css/app.min.css": ["<%= css %>"]
				}
			}
		},

		/**
		 * Overwrite the sass generated css by replacing image text url with image data url.
		 */
		imageEmbed:
		{
			android:
			{
				files:
				{
					"<%= platforms.android.folder %>/css/app.min.css": ["<%= platforms.android.folder %>/css/app.min.css"]
				}
			},
			ios:
			{
				files:
				{
					"<%= platforms.ios.folder %>/css/app.min.css": ["<%= platforms.ios.folder %>/css/app.min.css"]
				}
			},
			web:
			{
				files:
				{
					"<%= platforms.web.folder %>/css/app.min.css": ["<%= platforms.web.folder %>/css/app.min.css"]
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
		htmlmin:
		{
			options: options.html,
			android:
			{
				files: [
				{
					dest: "<%= platforms.android.folder %>/",
					src: ["<%= html %>"],
					expand: true,
					flatten: true
				}]
			},
			ios:
			{
				files: [
				{
					dest: "<%= platforms.ios.folder %>/",
					src: ["<%= html %>"],
					expand: true,
					flatten: true
				}]
			},
			web:
			{
				files: [
				{
					dest: "<%= platforms.web.folder %>/",
					src: ["<%= html %>"],
					expand: true,
					flatten: true
				}]
			}
		},

		/**
		 * Image files common to all platforms
		 */
		img: [
			"src/**/images/**"
		],

		/**
		 * Images optimisations
		 */
		imagemin:
		{
			options:
			{
				optimizationLevel: 3,
				progressive: true
			},
			android:
			{
				files: [
				{
					dest: "<%= platforms.android.folder %>/img/",
					src: ["<%= img %>"],
					expand: true,
					flatten: true
				}]
			},
			ios:
			{
				files: [
				{
					dest: "<%= platforms.ios.folder %>/img/",
					src: ["<%= img %>"],
					expand: true,
					flatten: true
				}]
			},
			web:
			{
				files: [
				{
					dest: "<%= platforms.web.folder %>/img/",
					src: ["<%= img %>"],
					expand: true,
					flatten: true
				}]
			}
		},

		/**
		 * Static resources common to all platforms.
		 */
		hierarchicalStatics: ["fonts/**"],
		flattenedStatics: [],

		/**
		 * Let's copy some static files.
		 */
		copy:
		{
			android:
			{
				files: [
				{
					dest: "<%= platforms.android.folder %>/",
					src: ["<%= hierarchicalStatics %>"]
				},
				{
					dest: "<%= platforms.android.folder %>/",
					src: ["<%= flattenedStatics %>"],
					expand: true,
					flatten: true
				}]
			},
			ios:
			{
				files: [
				{
					dest: "<%= platforms.ios.folder %>/",
					src: ["<%= hierarchicalStatics %>"]
				},
				{
					dest: "<%= platforms.ios.folder %>/",
					src: ["<%= flattenedStatics %>"],
					expand: true,
					flatten: true
				}]
			},
			web:
			{
				files: [
				{
					dest: "<%= platforms.web.folder %>/",
					src: ["<%= hierarchicalStatics %>"]
				},
				{
					dest: "<%= platforms.web.folder %>/",
					src: ["<%= flattenedStatics %>"],
					expand: true,
					flatten: true
				}]
			}
		},

		/*
		 * Documentation
		 */
		jsduck:
		{
			app:
			{
				options:
				{
					"builtin-classes": true,
					"title": "Nuborn documentation",
					"footer": "IT&L@bs Toulouse - Mobile team"
					// "tests": true
				},
				src: ["src/", "libs/Nuborn/"],
				dest: "docs/gen"
			}
		},

		/*
		 * Empty the build folder
		 */
		clean:
		{
			android:
			{
				src: ["<%= platforms.android.folder %>/*"]
			},
			ios:
			{
				src: ["<%= platforms.ios.folder %>/*"]
			},
			web:
			{
				src: ["<%= platforms.web.folder %>/*"]
			}
		},

		/*
		 * Rebuild on every save.
		 * Install this chrome extension to have automatic refresh in chrome :
		 * - https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
		 */
		watch:
		{
			options:
			{
				nospawn: false,
				livereload: true
			},
			scss:
			{
				files: "<%= css %>",
				tasks: ["nsass", "manifest"]
			},
			js:
			{
				files: "<%= js %>",
				tasks: ["nuglify", "manifest"]
			},
			htmlmin:
			{
				files: "<%= html %>",
				tasks: ["htmlmin", "manifest"]
			},
			hogan:
			{
				files: "<%= templates %>",
				tasks: ["hogan", "nuglify", "manifest"]
			},
			all:
			{
				files: "Gruntfile.js",
				tasks: [activeTargets().join(",")]
			}
		},

		/**
		 * Very simple web server to ease testing of the web application.
		 * Can be enhanced to be smarter by configuring the connect middleware.
		 * For instance, proxies can be added with this plugin : https://github.com/drewzboto/grunt-connect-proxy
		 */
		connect:
		{
			options:
			{
				hostname: "*",
				port: 9000,
				base: 'build/web',
				keepalive: true,
				middleware: function (connect, options)
				{
					return [
						// custom headers rewriting
						// example : https://gist.github.com/muratcorlu/5803655
						// function(req, res, next){

						// },

						// serve static files
						connect.static(options.base),

						// reverse Proxy Configuration
						// proxySnippet
					];
				}
			},
			web:
			{
				// reverse Proxy Configuration
				// proxies: [{
				//	context: '/reverse',
				//	host: 'placehold.it',
				//	port: 80,
				//	https: false,
				//	changeOrigin: true,
				//	rewrite: {
				//		'^/reverse': ''
				//	}
				//}]
			}
		},

		/**
		 * I highly recommend installing the grunt devtools chrome extension and the livereload chrome extension to
		 * to improve seriously productivity when developping for the web.
		 *
		 * Grunt devtools: https://chrome.google.com/webstore/detail/grunt-devtools/fbiodiodggnlakggeeckkjccjhhjndnb
		 * Livereload: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
		 */

		/**
		 * Unfortunately, for now, grunt manifest doesn't handle grunt files mechanism.
		 * So we are stick with manually excluding folders.
		 * I choose to not add images as they are already inlined in css. It would be not
		 * genuine to have them downloaded and put in cache twice.
		 * Of course, if some images are not used in css, it should be wise to add them
		 * specifically in the manifest.
		 */
		appcache: [
			"css/*.css",
			"js/*.js",
			"*.html",
			"fonts/*",
			"img/*",
			"!*.appcache"
		],

		/**
		 * Generate a manifest file (HTML5 cache).
		 */
		manifest:
		{
			options:
			{
				network: ["*"],
				fallback: ['/ /app.html#offline'],
				// preferOnline: true,
				verbose: false,
				timestamp: true
			},
			web:
			{
				options:
				{
					basePath: "<%= platforms.web.folder %>"
				},
				files: [
				{
					dest: "<%= platforms.web.folder %>/manifest.appcache",
					src: ["<%= appcache %>"]
				}]
			}
		}

	});


	/**
	 * Loading grunt plugins
	 */
	grunt.loadNpmTasks('grunt-jsduck');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-hogan');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-connect-proxy');
	grunt.loadNpmTasks('grunt-devtools');
	grunt.loadNpmTasks("grunt-image-embed");
	grunt.loadNpmTasks('grunt-manifest');


	/**
	 * Registering Default Task
	 */
	grunt.registerTask("default", ["clean", "hogan", "nuglify", "nsass", "htmlmin", "imagemin", "copy", "manifest"]);


	/**
	 * Registering one alias per target to allow compiling only one target
	 */
	grunt.registerTask("android", ["clean:android", "hogan:android", "nuglify:android", "nsass:android", "htmlmin:android", "imagemin:android", "copy:android"]);
	grunt.registerTask("ios", ["clean:ios", "hogan:ios", "nuglify:ios", "nsass:ios", "htmlmin:ios", "imagemin:ios", "copy:ios"]);
	grunt.registerTask("web", ["clean:web", "hogan:web", "nuglify:web", "nsass:web", "htmlmin:web", "imagemin:web", "copy:web", "manifest:web"]);

	/**
	 * Alias for hogan and nuglify tasks.
	 */
	grunt.registerTask("js", function ()
	{
		grunt.task.run("hogan");
		grunt.task.run("nuglify");
	});

	/**
	 * Registering a task to launch the web server.
	 */
	grunt.registerTask("server", ["configureProxies:web", "connect:web"]);

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
		var activePlatforms = activeTargets(grunt);
		var isGlobalBuild = task === "default";

		// if task isn't related to any platform, no preempting
		if (!isGlobalBuild && !isPlatformDependent(task))
			return false;

		// if a configuration exists for each active platform, preempts the default behavior by executing only
		// these ones
		activePlatforms.forEach(function (platform)
		{
			if (isGlobalBuild)
			{
				// executing all tasks for the current platforms
				grunt.task.run(platform);
			}
			else
			{
				// getting task and target configuration
				var conf = grunt.config.get(task + "." + platform);

				// if we found a configuration for that platform, we use it
				// executing task with correct target
				if (conf)
					grunt.task.run(task + ":" + platform);
			}
		});

		// task is platform dependent so it is preempted
		return true;
	}

	/**
	 * Compute an array of active target names.
	 */

	function activeTargets()
	{
		var platforms = grunt.config("platforms");
		var result = [];

		if (!platforms)
			return result;

		for (var targetName in platforms)
			if (platforms[targetName].active)
				result.push(targetName);

		return result;
	}

	/**
	 * Return true if task's configuration is platform dependent.
	 */

	function isPlatformDependent(task)
	{
		var platforms = grunt.config("platforms");
		var taskConfiguration = grunt.config(task);

		if (!taskConfiguration || !platforms || !Object.keys(platforms).length)
			return false;

		for (var platform in platforms)
		{
			if (taskConfiguration[platform])
				return true;
		}

		return false;
	}

	/**
	 * Hook that intercept calls to grunt.task.run so as to execute the task for active platforms only.
	 */
	grunt.util.hooker.hook(grunt.task, "run",
	{
		pre: function (task)
		{

			// if there is already a target specified, no hook
			// specifyng <task>: is also a way to bypass the hook without having target
			if (task.match(/:/g))
				return;

			// if task is platform dependent and has active targets : preempt
			if (executeTaskForActiveTargetsOnly(task))
				return grunt.util.hooker.preempt(true);
		}
	});

	/**
	 * Booster for sass configuration. Automagically sorts files according to their dependencies.
	 * Strictly identical to grunt-contrib-sass configuration as it is a wrapper for it.
	 * Will create a sass/target configuration and compute the final sorted "files" attribute.
	 * The task is invoked by the above hook for each active platform. Each time, a sass.target
	 * configuration is created.
	 */
	grunt.registerMultiTask("nsass", "wrapperfor grunt-contrib-sass", function ()
	{
		// sass config for the current target
		var sass = {
			options: this.options(),
			target:
			{
				files: []
			}
		};

		// resolving patterns and then dependencies order
		this.files.forEach(function (files)
		{
			sass.target.files.push(
			{
				src: GruntUtils.resolveDependencies(files.src),
				dest: files.dest
			});
		});

		// registering the sass config for execution
		grunt.config("sass", sass);
		grunt.task.run("sass:");
	});

	/**
	 * Booster for uglify configuration. Automagically sorts files according to their dependencies.
	 * Strictly identical to grunt-contrib-uglify configuration as it is a wrapper for it.
	 * Will create a uglify/target configuration and compute the final sorted "files" attribute.
	 * The task is invoked by the above hook for each active platform. Each time, a uglify.target
	 * configuration is created.
	 */
	grunt.registerMultiTask("nuglify", "wrapperfor grunt-contrib-uglify", function ()
	{
		// uglify config for the current target
		var uglify = {
			options: this.options(),
			target:
			{
				files: []
			}
		};

		// resolving patterns and then dependencies order
		this.files.forEach(function (files)
		{
			uglify.target.files.push(
			{
				src: GruntUtils.resolveDependencies(files.src),
				dest: files.dest
			});
		});

		// registering the uglify config for execution
		grunt.config("uglify", uglify);
		grunt.task.run("uglify:");
	});


};