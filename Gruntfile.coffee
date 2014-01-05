

###
Grunt Configuration
###
module.exports = ( grunt ) ->

    # Dependencies
    utils = require "./GruntUtils"
    $extend = require "./jQueryExtend"

    # REVERSE PROXY CONFIGURATION. Used by the connect task
    # proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest

    # Externals options which can be context dependent
    profile = grunt.option( "profile" )  || "dev"
    options = grunt.file.readJSON "conf/#{profile}.json"

    ###
    Receive a task name and if no target specified find active targets and execute the active ones.
    It is assumed that a task has only platform dependent targets.
    If a task has a target per platform plus some others targets, they will be ignored as
    no behavior can be assumed.
    You may enrich this by executing the non-platform dependent targets for each platform target,
    or before them, or after them, etc.

    @return true if task need to be preempted in order to execute platform dependent targets only.
    False else.
    ###
    executeTaskForActiveTargetsOnly = ( task ) ->

        activePlatforms = activeTargets()
        isGlobalBuild = task is "default"

        # If task isn't related to any platform, no preempting
        if !isGlobalBuild && !isPlatformDependent task then return false

        # If a configuration exists for each active platform, preempts the default behavior by executing only
        # these ones
        for platform in activePlatforms
            if isGlobalBuild
                # Executing all tasks for the current platforms
                grunt.task.run platform
            else
                # Getting task and target configuration
                conf = grunt.config.get "#{task}.#{platform}"

                # If we found a configuration for that platform, we use it
                # executing task with correct target
                if conf then grunt.task.run "#{task}:#{platform}"

        # Task is platform dependent so it is preempted
        return true



    ###
    Compute an array of active target names.
    ###
    activeTargets = () ->

        platforms = grunt.config "platforms"
        result = []

        return result if !platforms

        for platform of platforms
            if platforms[ platform ].active then result.push platform

        grunt.verbose.debug utils.toJSON( result )

        return result



    ###
    Return true if task's configuration is platform dependent.
    ###
    isPlatformDependent = ( task ) ->

        activePlatforms = activeTargets()
        taskConfiguration = grunt.config task

        if  !taskConfiguration || !activePlatforms || !activePlatforms.length then return false

        for platform in activePlatforms
            if taskConfiguration[ platform ]
                return true

        return false



    ###
    Grunt Configuration.
    ###
    grunt.initConfig

        ###
        Definition of build targets.
        ###
        platforms:
            root: "build/nuborn"
            android:
                folder: "<%= platforms.root %>/platforms/android/assets/www"
                active: false
            ios:
                folder: "<%= platforms.root %>/platforms/ios/www"
                active: false
            web:
                folder: "<%= platforms.root %>/platforms/web"
                active: true

        ###
        Common javascript libraries files for all platforms
        ###
        jsLibs: [
            "libs/Hogan/*.js",
            "libs/jQuery/*.min.js",
            "libs/Modernizr/*.js",
            "libs/FastClick/*.js",
            "{gen/src,src}/**/init/*.js", # jQuery Mobile pre-initialization
            "libs/jQueryMobile/*.js",
            "libs/SwipeJS/*.js",
            "gen/templates.js", # Generated sources
        ]

        ###
        Common javascript sources files for all platforms
        ###
        jsApp: [
            "gen/src/**/*.js", # Nuborn && App sources
            "!gen/src/**/*-async.js" # excluding all async files which will be requested manually
        ]

        ###
        These files will be requested manually asynchronously and not merged in the global file.
        ###
        asyncJs: [
            "{gen/src,libs}/**/*-async.{js,min.js}"
        ]

        ###
        Javascript compilation
        ###
        uglify:
            options: options.uglify,
            android:
                # Defining an ANDROID constant in order to allow compilation of android specific code
                options:
                    "compress": $extend( true, {}, options.uglify.compress, {
                        "global_defs": {
                            "ANDROID": true
                            "IOS": false
                            "WEB": false
                        }
                    } ),
                    "ignore": [ "<%= jsLibs %>", "<%= asyncJs %>" ]
                files: [ {
                    "<%= platforms.android.folder %>/js/app.min.js": [
                        "<%= platforms.android.folder %>/../../platform_www/*.js"
                        "<%= jsLibs %>"
                        "<%= jsApp %>"
                    ]
                }, {
                    dest: "<%= platforms.android.folder %>/js"
                    src: [ "<%= asyncJs %>" ]
                    expand: true
                    flatten: true
                    ext: ".min.js"
                } ]
            ios:
                # Defining an IOS constant in order to allow compilation of ios specific code
                options:
                    "compress": $extend( true, {}, options.uglify.compress, {
                        "global_defs": {
                            "ANDROID": false
                            "IOS": true
                            "WEB": false
                        }
                    } ),
                    "ignore": [ "<%= jsLibs %>", "<%= asyncJs %>" ]
                files: [ {
                    "<%= platforms.ios.folder %>/js/app.min.js": [
                        "<%= platforms.ios.folder %>/../platform_www/*.js"
                        "<%= jsLibs %>"
                        "<%= jsApp %>"
                    ]
                }, {
                    dest: "<%= platforms.ios.folder %>/js"
                    src: [ "<%= asyncJs %>" ]
                    expand: true
                    flatten: true
                    ext: ".min.js"
                } ]
            web:
                # Defining a WEB constant in order to allow compilation of web specific code
                options:
                    "compress": $extend( true, {}, options.uglify.compress, {
                        "global_defs":
                            "ANDROID": false
                            "IOS": false
                            "WEB": true
                    } )
                    "ignore": [ "<%= jsLibs %>", "<%= asyncJs %>" ]
                    # Define an entry source map to map coffee files to gen/app.js
                    # "sourceMapIn": "gen/src/app.js.map"
                    # Define the sourcemap file name
                    "sourceMap": ( filepath ) ->
                        return "#{filepath}.map" if profile isnt "prod"
                        return "" # no sourcemap in prod
                    # Define the sourcemap sourceMappingURL attribute value in the generated js files
                    "sourceMappingURL": ( filepath ) ->
                        if profile isnt "prod"
                            path = require "path"
                            dirname = path.dirname filepath
                            filepath = filepath.replace "#{dirname}/", ""
                            return "#{filepath}.map"
                        else
                            return "" # no sourcemap in prod
                    # Define the sourcemap source attribute value (useful to map on a symbolic link)
                    sourceMapRoot: "Nuborn"
                files: [ {
                    "<%= platforms.web.folder %>/js/app.min.js": [
                        "<%= jsLibs %>"
                        "<%= jsApp %>"
                    ]
                }, {
                    dest: "<%= platforms.web.folder %>/js"
                    src: [ "<%= asyncJs %>" ]
                    expand: true
                    flatten: true
                    ext: ".min.js"
                } ]

        ###
        Common coffee sources files for all platforms
        ###
        coffeeApp: [
            "src/**/*.coffee", # Nuborn && App sources
            "!src/**/*-async.coffee" # excluding all async files which will be requested manually
        ]

        ###
        These files will be requested manually asynchronously and not merged in the global file.
        ###
        asyncCoffee: [
            "src/**/*-async.coffee"
        ]

        ###
        Compile and tansform coffee scripts files to javascript files.
        ###
        coffee:
            options:
                bare: true
                join: true
                sourceMap: true
            common:
                files: [ {
                    # dest: "gen/"
                    dest: "gen/src/app.js"
                    src: "<%= coffeeApp %>"
                }, {
                    dest: "gen/"
                    src: "<%= asyncCoffee %>"
                    expand: true
                    ext: ".js"
                } ]

        ###
        Common teplates for all platforms
        ###
        templates: [
            "src/**/*.hogan"
        ]

        ###
        Templates compilation into javascript
        ###
        hogan:
            android:
                templates: [ "<%= templates %>" ]
                output: "gen/templates.js"
                binderName: "hulk"
            ios:
                templates: [ "<%= templates %>" ]
                output: "gen/templates.js"
                binderName: "hulk"
            web:
                templates: [ "<%= templates %>" ]
                output: "gen/templates.js"
                binderName: "hulk"

        ###
        Common css files for all platforms
        ###
        css: [
            "libs/jQueryMobile/*.css"
            "src/**/*.scss"
            "!{libs,src}/**/*-async.{css,min.css,scss}"
        ]

        ###
        These files will be requested manually asynchronously and not merged in the global file.
        ###
        asyncCss: [
            "{libs,src}/**/*-async.{css,min.css,scss}"
        ]

        ###
        CSS compilation
        ###
        nsass:
            options: options.sass
            android:
                files: [ {
                    "<%= platforms.android.folder %>/css/app.min.css": "<%= css %>"
                }, {
                    dest: "<%= platforms.android.folder %>/css"
                    src: "<%= asyncCss %>"
                    expand: true
                    flatten: true
                    ext: ".min.css"
                } ]
            ios:
                files: [ {
                    "<%= platforms.ios.folder %>/css/app.min.css": "<%= css %>"
                }, {
                    dest: "<%= platforms.ios.folder %>/css"
                    src: "<%= asyncCss %>"
                    expand: true
                    flatten: true
                    ext: ".min.css"
                } ]
            web:
                files: [ {
                    "<%= platforms.web.folder %>/css/app.min.css": "<%= css %>"
                }, {
                    dest: "<%= platforms.web.folder %>/css"
                    src: "<%= asyncCss %>"
                    expand: true
                    flatten: true
                    ext: ".min.css"
                } ]

        ###
        Parse and optimise generated css by adding and removing vendor prefixes.
        It allows us to code in pure css. No need to use sass mixins or duplicate code with prefixes.
        ###
        autoprefixer:
            # options:
                # browsers: [ 'android 4', 'ios 5' ]
            android:
                files:
                    '<%= platforms.android.folder %>/css/app.min.css': '<%= platforms.android.folder %>/css/app.min.css'
            ios:
                files:
                    '<%= platforms.ios.folder %>/css/app.min.css': '<%= platforms.ios.folder %>/css/app.min.css'
            web:
                files:
                    '<%= platforms.web.folder %>/css/app.min.css': '<%= platforms.web.folder %>/css/app.min.css'

        ###
        Overwrite the sass generated css by replacing image text url with image data url.
        Not used for now.
        ###
        imageEmbed:
            android:
                files:
                    "<%= platforms.android.folder %>/css/app.min.css": [ "<%= platforms.android.folder %>/css/app.min.css" ]
            ios:
                files:
                    "<%= platforms.ios.folder %>/css/app.min.css": [ "<%= platforms.ios.folder %>/css/app.min.css" ]
            web:
                files:
                    "<%= platforms.web.folder %>/css/app.min.css": [ "<%= platforms.web.folder %>/css/app.min.css" ]

        ###
        HTML files common to all platforms.
        ###
        html: [
            "src/**/*.html"
        ]

        ###
        HTML minification
        ###
        htmlmin:
            options: options.html
            android:
                files: [ {
                    dest: "<%= platforms.android.folder %>/"
                    src: [ "<%= html %>" ]
                    expand: true
                    flatten: true
                } ]
            ios:
                files: [ {
                    dest: "<%= platforms.ios.folder %>/"
                    src: [ "<%= html %>" ]
                    expand: true
                    flatten: true
                } ]
            web:
                files: [ {
                    dest: "<%= platforms.web.folder %>/"
                    src: [ "<%= html %>" ]
                    expand: true
                    flatten: true
                } ]

        ###
        Image files common to all platforms
        ###
        img: [
            "src/images/*"
        ]

        ###
        Images optimisations
        ###
        imagemin:
            options:
                optimizationLevel: 8
                progressive: true
            android:
                files: [ {
                    dest: "<%= platforms.android.folder %>/img/"
                    src: "<%= img %>"
                    expand: true
                    flatten: true
                } ]
            ios:
                files: [ {
                    dest: "<%= platforms.ios.folder %>/img/"
                    src: "<%= img %>"
                    expand: true
                    flatten: true
                } ]
            web:
                files: [ {
                    dest: "<%= platforms.web.folder %>/img/"
                    src: "<%= img %>"
                    expand: true
                    flatten: true
                } ]

        ###
        Static resources common to all platforms.
        ###
        hierarchicalStatics: [ "fonts/**" ]

        ###
        Let's copy some static files.
        ###
        copy:
            android:
                files: [ {
                    dest: "<%= platforms.android.folder %>/"
                    src: [ "<%= hierarchicalStatics %>" ]
                } ]
            ios:
                files: [ {
                    dest: "<%= platforms.ios.folder %>/"
                    src: [ "<%= hierarchicalStatics %>" ]
                } ]
            web:
                files: [ {
                    dest: "<%= platforms.web.folder %>/"
                    src: [ "<%= hierarchicalStatics %>" ]
                } ]

        ###
        Documentation
        ###
        jsduck:
            app:
                options:
                    "builtin-classes": true
                    "title": "Nuborn Documentation"
                    "footer": "Jean DAT"
                    # "tests": true
                src: [
                    "gen/src"
                    "src"
                ],
                dest: "docs/jsduck/gen"

        docco:
            app:
                options:
                    output: 'docs/docco/gen'
                    layout: "linear"
                    css: "docs/docco/docco.css"
                src: "<%= jsApp %>"

        ###
        Empty the build folder
        ###
        clean:
            android:
                src: [ "<%= platforms.android.folder %>/*", "gen/" ]
            ios:
                src: [ "<%= platforms.ios.folder %>/*", "gen/" ]
            web:
                src: [ "<%= platforms.web.folder %>/*", "gen/" ]

        ###
        Rebuild on every save.
        ###
        watch:
            options:
                spawn: false
                livereload:
                    port: 35735
                interrupt: true
                debounceDelay: 1000
            scss:
                files: [ "<%= css %>", "<%= asyncCss %>" ]
                tasks: [ "css" ]
            coffee:
                files: [ "src/**/*.coffee" ]
                tasks: [ "coffee" ]
            js:
                files: [ "<%= jsLibs%>", "<%= jsApp %>", "<%= asyncJs %>", "<%= templates %>" ]
                tasks: [ "javascript" ]
            htmlmin:
                files: "<%= html %>"
                tasks: [ "htmlmin", "manifest" ]
            all:
                files: "Gruntfile.js"
                tasks: activeTargets().join ","

        ###
        Very simple web server to ease testing of the web application.
        Can be enhanced to be smarter by configuring the connect middleware.
        For instance, proxies can be added with this plugin : https://github.com/drewzboto/grunt-connect-proxy
        ###
        connect:
            options:
                hostname: "*"
                port: 9005
                base: '<%= platforms.web.folder %>'
                keepalive: true
                middleware: ( connect, options ) ->
                    return [
                        # custom headers rewriting
                        # example : https://gist.github.com/muratcorlu/5803655
                        # function(req, res, next){

                        # },

                        # serve static files
                        connect.static( options.base ),

                        # make empty directories browsable
                        connect.directory( options.base )

                        # reverse Proxy Configuration
                        # proxySnippet
                    ]
            web: {}
            #     # reverse Proxy Configuration
            #     proxies: [{
            #         context: '/reverse'
            #         host: 'placehold.it'
            #         port: 80
            #         https: false
            #         changeOrigin: true
            #         rewrite:
            #         	'^/reverse': ''
            #     }]

        ###
        I recommend installing the grunt devtools chrome extension :
        Grunt devtools: https://chrome.google.com/webstore/detail/grunt-devtools/fbiodiodggnlakggeeckkjccjhhjndnb
        ###

        ###
        Unfortunately, for now, grunt manifest doesn't handle grunt files mechanism.
        So we are sticked with manually excluding folders.
        ###
        appcache: [
            "css/*.css",
            "js/*.js",
            "!js/*async*",
            "*.html",
            "fonts/Roboto/*",
            "fonts/Champagne/*",
            "fonts/icomoon/*",
            "img/*"
        ]

        ###
        Generate a manifest file (HTML5 cache).
        ###
        manifest:
            options:
                network: [ "*" ]
                # fallback: [ '/ /app.html#offline' ]
                # preferOnline: true
                verbose: false
                timestamp: true
            web:
                options:
                    basePath: "<%= platforms.web.folder %>"
                files: [ {
                    dest: "<%= platforms.web.folder %>/manifest.appcache"
                    src: [ "<%= appcache %>" ]
                } ]

        ###
        Allows us to debug a remote browser (android/ios).
        iOS tools are so great that we only use weinre for android.
        ###
        weinre:
            dev:
                options:
                    httpPort: 8085
                    boundHost: '-all-'
                    verbose: true
                    debug: true

        ###
        Allows to launch several commands at once in background.
        ###
        concurrent:
            web: [ "connect-server", "watch", "weinre" ]

        ###
        Allows to execute shell commands.
        Used for cordova compilation.
        ###
        exec:
            "cordova-prepare":
                command: ( target ) ->
                    return "cordova prepare #{target}"
                stdout: true
                stderror: true
                cwd: "<%= platforms.root %>"

        ###
        Create a symbolic link in the <build>/js folder used afterward by sourcemaps.
        It allows the browser to request source code outside of the web server context.
        ###
        symlink:
            web:
                src: "."
                dest: "<%= platforms.web.folder %>/js/Nuborn"



    ###
    Loading grunt plugins
    ###
    grunt.loadNpmTasks 'grunt-jsduck'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-hogan'
    grunt.loadNpmTasks 'grunt-contrib-sass'
    grunt.loadNpmTasks 'grunt-contrib-htmlmin'
    grunt.loadNpmTasks 'grunt-contrib-imagemin'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-connect'
    grunt.loadNpmTasks 'grunt-connect-proxy'
    grunt.loadNpmTasks 'grunt-devtools'
    grunt.loadNpmTasks "grunt-image-embed"
    grunt.loadNpmTasks 'grunt-manifest'
    grunt.loadNpmTasks 'grunt-concurrent'
    grunt.loadNpmTasks 'grunt-weinre'
    grunt.loadNpmTasks 'grunt-docco'
    grunt.loadNpmTasks 'grunt-exec'
    grunt.loadNpmTasks 'grunt-autoprefixer'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-symlink'



    ###
    Registering Default Task
    ###
    grunt.registerTask "default", [ "clean", "symlink", "exec:cordova-prepare", "coffee", "hogan", "uglify", "nsass", "autoprefixer", "htmlmin", "imagemin", "copy", "manifest" ]


    ###
    Registering one alias per target to allow compiling only one target
    ###
    grunt.registerTask "android", [ "clean:android", "exec:cordova-prepare:android", "coffee", "hogan:android", "uglify:android", "nsass:android", "autoprefixer:android", "htmlmin:android", "imagemin:android", "copy:android" ]
    grunt.registerTask "ios", [ "clean:ios", "exec:cordova-prepare:ios", "coffee", "hogan:ios", "uglify:ios", "nsass:ios", "autoprefixer:ios", "htmlmin:ios", "imagemin:ios", "copy:ios" ]
    grunt.registerTask "web", [ "clean:web", "symlink:web", "coffee", "hogan:web", "uglify:web", "nsass:web", "autoprefixer:web", "htmlmin:web", "imagemin:web", "copy:web", "manifest:web" ]

    ###
    Alias for everything javascript related.
    ###
    grunt.registerTask "javascript", [ "javascript code" ]
    # using grunt.task.run syntax instead the alias one because the hook doesn't work
    grunt.registerTask "javascript code", () ->
        grunt.task.run "coffee"
        grunt.task.run "hogan"
        grunt.task.run "uglify"
        grunt.task.run "manifest"

    ###
    Alias for everything css related.
    ###
    grunt.registerTask "css", [ "css code" ]
    # using grunt.task.run syntax instead the alias one because the hook doesn't work
    grunt.registerTask "css code", () ->
        grunt.task.run "nsass"
        grunt.task.run "autoprefixer"
        grunt.task.run "manifest"

    ###
    Registering an alias task to launch the web server.
    ###
    grunt.registerTask "server", [ "configureProxies:web", "connect:web" ]

    ###
    Registering an alias task to launch the watch server.
    ###
    grunt.registerTask "watcher", [ "watch" ]

    ###
    Registering an alias task to launch the weinre server.
    ###
    grunt.registerTask "remote", [ "weinre" ]

    ###
    Documentation alias task.
    ###
    grunt.registerTask "docs", [ "jsduck", "docco" ]



    ###
    Hook that intercept calls to grunt.task.run so as to execute the task for active platforms only.
    ###
    grunt.util.hooker.hook grunt.task, "run", {
        pre: ( task ) ->

            # If there is already a target specified, no hook
            # specifyng <task>: is also a way to bypass the hook without having a target
            return if task.match /:/g

            # If task is platform dependent and has active targets : preempt
            if executeTaskForActiveTargetsOnly task
                return grunt.util.hooker.preempt true
    }



    ###
    Booster for sass configuration. Automagically sorts files according to their dependencies.
    Strictly identical to grunt-contrib-sass configuration as it is a wrapper for it.
    Will create a sass/target configuration and compute the final sorted "files" attribute.
    The task is invoked by the above hook for each active platform. Each time, a sass.target
    configuration is created.
    ###
    grunt.registerMultiTask "nsass", "wrapper for grunt-contrib-sass", () ->

        # Sass config for the current target
        sass =
            options: this.options()
            target:
                files: []


        # Resolving patterns and then dependencies order
        this.files.forEach ( files ) ->
            sass.target.files.push
                src: utils.resolveSassDependencies files.src
                dest: files.dest

        # Registering the sass config for execution
        grunt.config "sass", sass
        grunt.task.run "sass:"



    ###
    Booster for uglify configuration. Automagically sorts files according to their dependencies.
    Strictly identical to grunt-contrib-uglify configuration as it is a wrapper for it.
    Will create a uglify/target configuration and compute the final sorted "files" attribute.
    The task is invoked by the above hook for each active platform. Each time, a uglify.target
    configuration is created.
    ###
    # grunt.registerMultiTask "nuglify", "wrapper for grunt-contrib-uglify", () ->

    #     # Uglify config for the current target
    #     uglify =
    #         options: this.options()
    #         target:
    #             files: []

    #     options = this.data.options

    #     # Resolving patterns and then dependencies order
    #     this.files.forEach ( files ) ->
    #         uglify.target.files.push
    #             src: utils.resolveJavascriptDependencies files.src, options
    #             dest: files.dest

    #     # Registering the uglify config for execution
    #     grunt.config "uglify", uglify
    #     grunt.task.run "uglify:"

