var GruntUtils = require( "./GruntUtils" );

// --- REVERSE PROXY CONFIGURATION
// --- Used by the connect task
// var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest

/**
 * Grunt Configuration
 */
module.exports = function ( grunt ) {

    // externals options which can be context dependent
    var profile = grunt.option( "profile" ) || "dev";
    var options = grunt.file.readJSON( "conf/" + profile + ".json" );
    var debug = grunt.option( "debug" );

    grunt.initConfig( {

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
         * Common javascript libraries files for all platforms
         */
        jsLibs: [
            "libs/Hogan/*.js",
            "libs/jQuery/*.min.js",
            "libs/Modernizr/*.js",
            "{libs/Nuborn,src/app}/init/*.js", // jQuery Mobile pre-initialization
            "libs/jQueryMobile/*.js",
            "libs/SwipeJS/*.js",
            "gen/*.js", // Generated sources
        ],

        /**
         * Common javascript sources files for all platforms
         */
        jsApp: [
            "{libs/Nuborn,src}/**/*.js", // Nuborn && App sources
            "!{libs/Nuborn,src}/**/*-async.js" // excluding all async files which will be requested manually
        ],

        /**
         * These files will be requested manually asynchronously and not merged in the global file.
         */
        asyncJs: [
            "{libs,src}/**/*-async.{js,min.js}"
        ],

        /**
         * Javascript compilation
         */
        nuglify: {
            options: options.uglify,
            android: {
                // defining an ANDROID constant in order to allow compilation of android specific code
                options: {
                    "compress": GruntUtils.extend( true, {}, options.uglify.compress, {
                        "global_defs": {
                            "ANDROID": true,
                            "IOS": false,
                            "WEB": false
                        }
                    } ),
                    "ignore": "<%= jsLibs %>"
                },
                files: [ {
                    "<%= platforms.android.folder %>/js/app.min.js": [ "libs/Cordova/cordova.android.js", "<%= jsLibs %>", "<%= jsApp %>" ]
                }, {
                    dest: "<%= platforms.android.folder %>/js",
                    src: [ "<%= asyncJs %>" ],
                    expand: true,
                    flatten: true,
                    ext: ".min.js"
                } ]
            },
            ios: {
                // defining an IOS constant in order to allow compilation of ios specific code
                options: {
                    "compress": GruntUtils.extend( true, {}, options.uglify.compress, {
                        "global_defs": {
                            "ANDROID": false,
                            "IOS": true,
                            "WEB": false
                        }
                    } ),
                    "ignore": "<%= jsLibs %>"
                },
                files: [ {
                    "<%= platforms.ios.folder %>/js/app.min.js": [ "libs/Cordova/cordova.ios.js", "<%= jsLibs %>", "<%= jsApp %>" ]
                }, {
                    dest: "<%= platforms.ios.folder %>/js",
                    src: [ "<%= asyncJs %>" ],
                    expand: true,
                    flatten: true,
                    ext: ".min.js"
                } ]
            },
            web: {
                // defining a WEB constant in order to allow compilation of web specific code
                options: {
                    "compress": GruntUtils.extend( true, {}, options.uglify.compress, {
                        "global_defs": {
                            "ANDROID": false,
                            "IOS": false,
                            "WEB": true
                        }
                    } ),
                    "ignore": [ "<%= jsLibs %>", "<%= asyncJs %>" ]
                },
                files: [ {
                    "<%= platforms.web.folder %>/js/app.min.js": [ "<%= jsLibs %>", "<%= jsApp %>" ]
                }, {
                    dest: "<%= platforms.web.folder %>/js",
                    src: [ "<%= asyncJs %>" ],
                    expand: true,
                    flatten: true,
                    ext: ".min.js"
                } ]
            }
        },

        /**
         * Common teplates for all platforms
         */
        templates: [
            "{libs/Nuborn,src}/**/*.hogan"
        ],

        /**
         * Templates compilation into javascript
         */
        hogan: {
            android: {
                templates: [ "<%= templates %>" ],
                output: "gen/templates.js",
                binderName: "hulk"
            },
            ios: {
                templates: [ "<%= templates %>" ],
                output: "gen/templates.js",
                binderName: "hulk"
            },
            web: {
                templates: [ "<%= templates %>" ],
                output: "gen/templates.js",
                binderName: "hulk"
            }
        },

        /**
         * Common css files for all platforms
         */
        css: [
            "libs/jQueryMobile/*.css",
            "{libs,src}/**/*.scss",
            "!{libs/Nuborn,src}/**/*-async.css"
        ],

        /**
         * These files will be requested manually asynchronously and not merged in the global file.
         */
        asyncCss: [
            "{libs,src}/**/*-async.{css,min.css}"
        ],

        /**
         * CSS compilation
         */
        nsass: {
            options: options.sass,
            android: {
                files: [ {
                    "<%= platforms.android.folder %>/css/app.min.css": "<%= css %>"
                }, {
                    dest: "<%= platforms.android.folder %>/css",
                    src: "<%= asyncCss %>",
                    expand: true,
                    flatten: true,
                    ext: ".min.css"
                } ]
            },
            ios: {
                files: [ {
                    "<%= platforms.ios.folder %>/css/app.min.css": "<%= css %>"
                }, {
                    dest: "<%= platforms.ios.folder %>/css",
                    src: "<%= asyncCss %>",
                    expand: true,
                    flatten: true,
                    ext: ".min.css"
                } ]
            },
            web: {
                files: [ {
                    "<%= platforms.web.folder %>/css/app.min.css": "<%= css %>"
                }, {
                    dest: "<%= platforms.web.folder %>/css",
                    src: "<%= asyncCss %>",
                    expand: true,
                    flatten: true,
                    ext: ".min.css"
                } ]
            }
        },

        /**
         * Overwrite the sass generated css by replacing image text url with image data url.
         */
        imageEmbed: {
            android: {
                files: {
                    "<%= platforms.android.folder %>/css/app.min.css": [ "<%= platforms.android.folder %>/css/app.min.css" ]
                }
            },
            ios: {
                files: {
                    "<%= platforms.ios.folder %>/css/app.min.css": [ "<%= platforms.ios.folder %>/css/app.min.css" ]
                }
            },
            web: {
                files: {
                    "<%= platforms.web.folder %>/css/app.min.css": [ "<%= platforms.web.folder %>/css/app.min.css" ]
                }
            }
        },

        /**
         * HTML files common to all platforms.
         */
        html: [
            "src/**/*.html",
        ],

        /**
         * HTML minification
         */
        htmlmin: {
            options: options.html,
            android: {
                files: [ {
                    dest: "<%= platforms.android.folder %>/",
                    src: [ "<%= html %>" ],
                    expand: true,
                    flatten: true
                } ]
            },
            ios: {
                files: [ {
                    dest: "<%= platforms.ios.folder %>/",
                    src: [ "<%= html %>" ],
                    expand: true,
                    flatten: true
                } ]
            },
            web: {
                files: [ {
                    dest: "<%= platforms.web.folder %>/",
                    src: [ "<%= html %>" ],
                    expand: true,
                    flatten: true
                } ]
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
                optimizationLevel: 8,
                progressive: true
            },
            android: {
                files: [ {
                    dest: "<%= platforms.android.folder %>/img/",
                    src: "<%= img %>",
                    expand: true,
                    flatten: true
                } ]
            },
            ios: {
                files: [ {
                    dest: "<%= platforms.ios.folder %>/img/",
                    src: "<%= img %>",
                    expand: true,
                    flatten: true
                } ]
            },
            web: {
                files: [ {
                    dest: "<%= platforms.web.folder %>/img/",
                    src: "<%= img %>",
                    expand: true,
                    flatten: true
                } ]
            }
        },

        /**
         * Static resources common to all platforms.
         */
        hierarchicalStatics: [ "fonts/**" ],

        /**
         * Let's copy some static files.
         */
        copy: {
            android: {
                files: [ {
                    dest: "<%= platforms.android.folder %>/",
                    src: [ "<%= hierarchicalStatics %>" ]
                } ]
            },
            ios: {
                files: [ {
                    dest: "<%= platforms.ios.folder %>/",
                    src: [ "<%= hierarchicalStatics %>" ]
                } ]
            },
            web: {
                files: [ {
                    dest: "<%= platforms.web.folder %>/",
                    src: [ "<%= hierarchicalStatics %>" ]
                } ]
            }
        },

        /*
         * Documentation
         */
        jsduck: {
            app: {
                options: {
                    "builtin-classes": true,
                    "title": "Nuborn Documentation",
                    "footer": "Jean DAT"
                    // "tests": true
                },
                src: [ "src/", "libs/Nuborn/" ],
                dest: "docs/jsduck/gen"
            }
        },

        docco: {
            app: {
                src: [ 'src/**/*.js', "libs/Nuborn/**/*.js" ],
                options: {
                    output: 'docs/docco/gen',
                    layout: "linear",
                    css: "docs/docco/docco.css"
                }
            }
        },

        /*
         * Empty the build folder
         */
        clean: {
            android: {
                src: [ "<%= platforms.android.folder %>/*" ]
            },
            ios: {
                src: [ "<%= platforms.ios.folder %>/*" ]
            },
            web: {
                src: [ "<%= platforms.web.folder %>/*" ]
            }
        },

        /*
         * Rebuild on every save.
         * Install this chrome extension to have automatic refresh in chrome :
         * - https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
         */
        watch: {
            options: {
                spawn: false,
                livereload: {
                    port: 35735
                },
                interrupt: true,
                debounceDelay: 1000
            },
            scss: {
                files: [ "<%= css %>", "<%= asyncCss %>" ],
                tasks: [ "nsass", "manifest" ]
            },
            js: {
                files: [ "<%= jsLibs%>", , "<%= jsApp %>", "<%= asyncJs %>" ],
                tasks: [ "nuglify", "manifest" ]
            },
            htmlmin: {
                files: "<%= html %>",
                tasks: [ "htmlmin", "manifest" ]
            },
            hogan: {
                files: "<%= templates %>",
                tasks: [ "hogan", "nuglify", "manifest" ]
            },
            all: {
                files: "Gruntfile.js",
                tasks: [ activeTargets().join( "," ) ]
            }
        },

        /**
         * Very simple web server to ease testing of the web application.
         * Can be enhanced to be smarter by configuring the connect middleware.
         * For instance, proxies can be added with this plugin : https://github.com/drewzboto/grunt-connect-proxy
         */
        connect: {
            options: {
                hostname: "*",
                port: 9005,
                base: 'build/web',
                keepalive: true,
                middleware: function ( connect, options ) {
                    return [
                        // custom headers rewriting
                        // example : https://gist.github.com/muratcorlu/5803655
                        // function(req, res, next){

                        // },

                        // serve static files
                        connect.static( options.base ),

                        // make empty directories browsable
                        connect.directory( options.base )

                        // reverse Proxy Configuration
                        // proxySnippet
                    ];
                }
            },
            web: {
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
         * I highly recommend installing the grunt devtools chrome extension and the livereload chrome extension
         * to improve seriously productivity when developping for the web.
         *
         * Grunt devtools: https://chrome.google.com/webstore/detail/grunt-devtools/fbiodiodggnlakggeeckkjccjhhjndnb
         * Livereload: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
         */

        /**
         * Unfortunately, for now, grunt manifest doesn't handle grunt files mechanism.
         * So we are sticked with manually excluding folders.
         */
        appcache: [
            "css/*.css",
            "js/*.js",
            "!js/*async*",
            "*.html",
            "fonts/Roboto/*",
            "fonts/Champagne/*",
            "fonts/icomoon/*",
            "img/*"
        ],

        /**
         * Generate a manifest file (HTML5 cache).
         */
        manifest: {
            options: {
                network: [ "*" ],
                // fallback: [ '/ /app.html#offline' ],
                // preferOnline: true,
                verbose: false,
                timestamp: true
            },
            web: {
                options: {
                    basePath: "<%= platforms.web.folder %>"
                },
                files: [ {
                    dest: "<%= platforms.web.folder %>/manifest.appcache",
                    src: [ "<%= appcache %>" ]
                } ]
            }
        },

        weinre: {
            dev: {
                options: {
                    httpPort: 8085,
                    boundHost: '-all-',
                    verbose: true,
                    debug: true
                }
            }
        },

        concurrent: {
            web: [ "connect-server", "watch", "weinre" ]
        }

    } );


    /**
     * Loading grunt plugins
     */
    grunt.loadNpmTasks( 'grunt-jsduck' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-hogan' );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );
    grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-connect-proxy' );
    grunt.loadNpmTasks( 'grunt-devtools' );
    grunt.loadNpmTasks( "grunt-image-embed" );
    grunt.loadNpmTasks( 'grunt-manifest' );
    grunt.loadNpmTasks( 'grunt-concurrent' );
    grunt.loadNpmTasks( 'grunt-weinre' );
    grunt.loadNpmTasks( 'grunt-docco' );


    /**
     * Registering Default Task
     */
    grunt.registerTask( "default", [ "clean", "hogan", "nuglify", "nsass", "htmlmin", "imagemin", "copy", "manifest" ] );


    /**
     * Registering one alias per target to allow compiling only one target
     */
    grunt.registerTask( "android", [ "clean:android", "hogan:android", "nuglify:android", "nsass:android", "htmlmin:android", "imagemin:android", "copy:android" ] );
    grunt.registerTask( "ios", [ "clean:ios", "hogan:ios", "nuglify:ios", "nsass:ios", "htmlmin:ios", "imagemin:ios", "copy:ios" ] );
    grunt.registerTask( "web", [ "clean:web", "hogan:web", "nuglify:web", "nsass:web", "htmlmin:web", "imagemin:web", "copy:web", "manifest:web" ] );

    /**
     * Alias for hogan + nuglify + manifest tasks.
     */
    grunt.registerTask( "javascript", [ "javascript code" ] );
    // using grunt.task.run syntax instead the alias one because the hook doesn't work
    grunt.registerTask( "javascript code", function () {
        grunt.task.run( "hogan" );
        grunt.task.run( "nuglify" );
        grunt.task.run( "manifest" );
    } );

    /**
     * Alias for nsass + manifest tasks.
     */
    grunt.registerTask( "css", [ "css code" ] );
    // using grunt.task.run syntax instead the alias one because the hook doesn't work
    grunt.registerTask( "css code", function () {
        grunt.task.run( "nsass" );
        grunt.task.run( "manifest" );
    } );

    /**
     * Registering an alias task to launch the web server.
     */
    grunt.registerTask( "server", [ "configureProxies:web", "connect:web" ] );

    /**
     * Registering an alias task to launch the watcher.
     */
    grunt.registerTask( "watcher", [ "watch" ] );

    /**
     * Weinre alias.
     */
    grunt.registerTask( "remote", [ "weinre" ] );

    /**
     * Documentation task.
     */
    grunt.registerTask( "docs", [ "jsduck", "docco" ] );

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

    function executeTaskForActiveTargetsOnly( task ) {
        var activePlatforms = activeTargets( grunt );
        var isGlobalBuild = task === "default";

        // if task isn't related to any platform, no preempting
        if ( !isGlobalBuild && !isPlatformDependent( task ) )
            return false;

        // if a configuration exists for each active platform, preempts the default behavior by executing only
        // these ones
        activePlatforms.forEach( function ( platform ) {
            if ( isGlobalBuild ) {
                // executing all tasks for the current platforms
                grunt.task.run( platform );
            }
            else {
                // getting task and target configuration
                var conf = grunt.config.get( task + "." + platform );

                // if we found a configuration for that platform, we use it
                // executing task with correct target
                if ( conf )
                    grunt.task.run( task + ":" + platform );
            }
        } );

        // task is platform dependent so it is preempted
        return true;
    }

    /**
     * Compute an array of active target names.
     */

    function activeTargets() {
        var platforms = grunt.config( "platforms" );
        var result = [];

        if ( !platforms )
            return result;

        for ( var platform in platforms )
            if ( platforms[ platform ].active )
                result.push( platform );

        debug && grunt.log.writeln( JSON.stringify( result, null, "    " ) );

        return result;
    }

    /**
     * Return true if task's configuration is platform dependent.
     */

    function isPlatformDependent( task ) {
        var platforms = grunt.config( "platforms" );
        var taskConfiguration = grunt.config( task );

        if ( !taskConfiguration || !platforms || !Object.keys( platforms ).length )
            return false;

        for ( var platform in platforms ) {
            if ( taskConfiguration[ platform ] )
                return true;
        }

        return false;
    }

    /**
     * Hook that intercept calls to grunt.task.run so as to execute the task for active platforms only.
     */
    grunt.util.hooker.hook( grunt.task, "run", {
        pre: function ( task ) {

            // if there is already a target specified, no hook
            // specifyng <task>: is also a way to bypass the hook without having a target
            if ( task.match( /:/g ) )
                return;

            // if task is platform dependent and has active targets : preempt
            if ( executeTaskForActiveTargetsOnly( task ) )
                return grunt.util.hooker.preempt( true );
        }
    } );

    /**
     * Booster for sass configuration. Automagically sorts files according to their dependencies.
     * Strictly identical to grunt-contrib-sass configuration as it is a wrapper for it.
     * Will create a sass/target configuration and compute the final sorted "files" attribute.
     * The task is invoked by the above hook for each active platform. Each time, a sass.target
     * configuration is created.
     */
    grunt.registerMultiTask( "nsass", "wrapperfor grunt-contrib-sass", function () {
        // sass config for the current target
        var sass = {
            options: this.options(),
            target: {
                files: []
            }
        };

        var options = this.data.options;

        // resolving patterns and then dependencies order
        this.files.forEach( function ( files ) {
            sass.target.files.push( {
                src: GruntUtils.resolveDependencies( files.src, options ),
                dest: files.dest
            } );
        } );

        // registering the sass config for execution
        grunt.config( "sass", sass );
        grunt.task.run( "sass:" );
    } );

    /**
     * Booster for uglify configuration. Automagically sorts files according to their dependencies.
     * Strictly identical to grunt-contrib-uglify configuration as it is a wrapper for it.
     * Will create a uglify/target configuration and compute the final sorted "files" attribute.
     * The task is invoked by the above hook for each active platform. Each time, a uglify.target
     * configuration is created.
     */
    grunt.registerMultiTask( "nuglify", "wrapperfor grunt-contrib-uglify", function () {
        // uglify config for the current target
        var uglify = {
            options: this.options(),
            target: {
                files: []
            }
        };

        var options = this.data.options;

        // resolving patterns and then dependencies order
        this.files.forEach( function ( files ) {
            uglify.target.files.push( {
                src: GruntUtils.resolveDependencies( files.src, options ),
                dest: files.dest
            } );
        } );

        // registering the uglify config for execution
        grunt.config( "uglify", uglify );
        grunt.task.run( "uglify:" );
    } );

};