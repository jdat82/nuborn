/**
 * Grunt Configuration
 */
module.exports = function(grunt) {

	// externals options which can be context dependent
	var profile = grunt.option("profile") || "prod";
	var options = grunt.file.readJSON(profile + ".json");

	grunt.initConfig({

		/**
		 * Definition of build targets
		 */
		targets: {
			android: "build/android/assets/www",
			ios: "build/ios/www",
			web: "build/web"
		},

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
		"uglify": {
			options: {
				compress: options.js.compress,
				beautify: options.js.beautify,
				report: options.js.report
			},
			web: {
				files: {
					"<%= targets.web %>/js/app.min.js": ["<%= js %>"]
				}
			},
			android: {
				files: {
					"<%= targets.android %>/js/app.min.js": ["libs/Cordova/cordova.android.js", "<%= js %>"]
				}
			},
			ios: {
				files: {
					"<%= targets.ios %>/js/app.min.js": ["libs/Cordova/cordova.ios.js", "<%= js %>"]
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
		"sass": {
			options: {
				style: options.css.style,
				noCache: options.css.noCache
			},
			android: {
				files: {
					"<%= targets.android %>/css/app.min.css": ["<%= css %>"]
				}
			},
			ios: {
				files: {
					"<%= targets.ios %>/css/app.min.css": ["<%= css %>"]
				}
			},
			web: {
				files: {
					"<%= targets.web %>/css/app.min.css": ["<%= css %>"]
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
					{ dest: "<%= targets.android %>/", src: ["<%= html %>"], expand: true, flatten: true }
				]
			},
			ios: {
				files: [
					{ dest: "<%= targets.ios %>/", src: ["<%= html %>"], expand: true, flatten: true }
				]
			},
			web: {
				files: [
					{ dest: "<%= targets.web %>/", src: ["<%= html %>"], expand: true, flatten: true }
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
					{ dest: "<%= targets.android %>/images/", src: ["<%= img %>"], expand: true, flatten: true }
				]
			},
			ios: {
				files: [
					{ dest: "<%= targets.ios %>/images/", src: ["<%= img %>"], expand: true, flatten: true }
				]
			},
			web: {
				files: [
					{ dest: "<%= targets.web %>/images/", src: ["<%= img %>"], expand: true, flatten: true }
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
					{ dest: "<%= targets.android %>/", src: ["<%= fonts %>"], expand: true }
				]
			},
			ios: {
				files: [
					{ dest: "<%= targets.ios %>/", src: ["<%= fonts %>"], expand: true }
				]
			},
			web: {
				files: [
					{ dest: "<%= targets.web %>/", src: ["<%= fonts %>"], expand: true }
				]
			}	
		},

		/**
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

		clean: {
			android: {
				src: [ "<%= targets.android %>/*" ]
			},
			ios: {
				src: [ "<%= targets.ios %>/*" ]
			},
			web: {
				src: [ "<%= targets.web %>/*" ]
			}
		}
	});

	grunt.loadNpmTasks('grunt-jsduck');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Registering Default Task
	grunt.registerTask("default", [ "uglify", "sass", "htmlmin", "imagemin", "copy" ]);

	// Registering one alias per target to allow compiling only one target
	grunt.registerTask("android", [ "uglify:android", "sass:android", "htmlmin:android", "imagemin:android", "copy:android" ]);
	grunt.registerTask("ios", [ "uglify:ios", "sass:ios", "htmlmin:ios", "imagemin:ios", "copy:ios" ]);
	grunt.registerTask("web", [ "uglify:web", "sass:web", "htmlmin:web", "imagemin:web", "copy:web" ]);

};