/**
 * Grunt Configuration
 */
 module.exports = function(grunt) {

	grunt.initConfig({

		// definition of build targets
		targets: {
			android: {
				active: true,
				folder: "build/android/assets/www"
			},
			ios: {
				active: true,
				folder: "build/ios/www"
			},
			web: {
				active: true,
				folder: "build/web"
			}
		},

		// common javascript files for all targets
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

		css: [
			"libs/jQueryMobile/*.css", /** jQuery Mobile is required **/
			"libs/Nuborn/sass/mixins.scss",
			"libs/SwipeJS/*.scss",
			"src/**/*.scss"
		],

		// javascript compilation
		"uglify": {
			options: {
				compress: true,
				beautify: false,
				report: "min"
			},
			web: {
				files: {
					"<%=targets.web.folder%>/js/app.min.js": ["<%= js %>"]
				}
			},
			android: {
				files: {
					"<%=targets.android.folder%>/js/app.min.js": ["libs/Cordova/cordova.android.js", "<%= js %>"]
				}
			},
			ios: {
				files: {
					"<%=targets.ios.folder%>/js/app.min.js": ["libs/Cordova/cordova.ios.js", "<%= js %>"]
				}
			}
		},

		// css compilation
		"sass": {
			options: {
				style: "compressed",
				noCache: true
			},
			android: {
				files: {
					"<%=targets.android.folder%>/css/app.min.css": ["<%=css%>"]
				}
			},
			ios: {
				files: {
					"<%=targets.ios.folder%>/css/app.min.css": ["<%=css%>"]
				}
			},
			web: {
				files: {
					"<%=targets.web.folder%>/css/app.min.css": ["<%=css%>"]
				}
			}
		}


	});

	grunt.loadNpmTasks('grunt-jsduck');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');

	/**
	 * Loading Tasks
	 */
	//grunt.loadNpmTasks('grunt-nuborn');

	/**
	 * Registering Default Task
	 */
	 grunt.registerTask("default", ["uglify", "compass"]);

	};