// load grunt API
var grunt = require("grunt")

// load path API
var nodePath = require("path")

// system path separator
var sep = nodePath.sep

var debug = grunt.option("debug")

/**
 * Utility methods.
 */
var Util = {

    /**
     * The jQuery Extend method so as to easily extend configurations
     */
    jQueryExtend: function() 
    {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target
            target = arguments[1] || {}
            // skip the boolean and the target
            i = 2
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && typeof target !== 'function') {
            target = {}
        }

        // extend jQuery itself if only one argument is passed
        if (length === i) {
            target = this
            --i
        }

        for (;i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name]
                    copy = options[name]

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && ((copyIsArray = Array.isArray(copy)) || (typeof copy === 'object'))) {
                        if (copyIsArray) {
                            copyIsArray = false
                            clone = src && Array.isArray(src) ? src : []

                        } else {
                            clone = src && (!Array.isArray(src) && typeof src === 'object') ? src : {}
                        }

                        // Never move original objects, clone them
                        target[name] = this.jQueryExtend(deep, clone, copy)

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy
                    }
                }
            }
        }

        // Return the modified object
        return target
    },

    /**
     * Simply add a slash to a dir if there is not.
     */
    addSeparatorToPath: function(path)
    {
        var dir = path
        if (dir.charAt(dir.length - 1) !== sep) {
            dir = dir + sep
        }
        return dir
    },

    /**
     * -- An utility function that sorts files acording to their dependencies
     * -- @provide & @require
     */
    resolveDependencies: function(patterns)
    {
        // Get all non sorted sources 
        var sources = grunt.file.expand(patterns)
        
        if(debug) {
            grunt.log.writeln()
            grunt.log.writeln("SOURCES BEFORE RESOLVE PHASE: \n" + sources.join("\n"))
        }

        // Create the compiled object and array
        var compiled = {}
        var compiledArray = []
        // Create all requires and provide arrays
        var allRequires = []
        var allProvides = []
        // Loop on all sources to find dependences
        for (var i = 0, sourcesLength = sources.length; i < sourcesLength; i++) {
            // get the current source
            var source = sources[i]
            // Read the content of the source
            var content = grunt.file.read(source)
            // Get all documentation block comments
            var comments = content.match(/\/\*\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\//g) || []

            // Create requires and provides arrays
            var requires = []
            var provides = []
            // Loop on the comments to get the requires and provides
            for (var j = 0, commentsLength = comments.length; j < commentsLength; j++) {
                var comment = comments[j]
                requires = requires.concat(comment.match(/(@require).*/g) || [])
                provides = provides.concat(comment.match(/(@provide).*/g) || [])
            }

            if(debug)
                grunt.log.writeln("In " + source + "...")

            // Find all lines containing @provide
            //var provides = content.match(/(@provide).*/g) || []
            for (var j = 0, providesLength = provides.length; j < providesLength; j++) {
                // get the value for the @provide annotation
                var provide = provides[j].replace("@provide", "").trim()
                // if the provide already exists, stop the task 
                if (allProvides.indexOf(provide) !== -1) {
                    grunt.fail.fatal("Multiple Provide : " + provide + " !", 3)
                    return false
                }
                // save the value in the allProvides array
                allProvides.push(provide)
                // replace the current value in the array
                provides[j] = provide
            }

            if(debug)
                grunt.log.writeln("     Provides: " + provides.join(" / "))

            // Find all lines containing @require
            var requires = content.match(/(@require).*/g) || []
            for (var j = 0, requiresLength = requires.length; j < requiresLength; j++) {
                // get the value for the @require annotation
                var require = requires[j].replace("@require", "").trim()
                // replace the current value in the array
                requires[j] = require
                // save the value in th allRequires array
                if (allRequires.indexOf(require) === -1) {
                    allRequires.push(require)
                }
            }

            if(debug) 
                grunt.log.writeln("     Requires: " + requires.join(" / "))

            // save information for the source into a dictionary object
            var compile = {
                source: source,
                requires: requires,
                provides: provides
            }

            // save the compiled object to the compile Array
            compiledArray.push(compile)

            // save the object into the compiled dictionnary with the provides as keys
            for (var j = 0, providesLength = provides.length; j < providesLength; j++) {
                compiled[provides[j]] = compile
            }
        }

        if(debug)
            grunt.log.writeln("Dependencies tree: " + JSON.stringify(compiledArray))

        // Loop on allRequires to check if all requires has a corresponding provide
        for (var i = 0, length = allRequires.length; i < length; i++) {
            var require = allRequires[i]
            if (allProvides.indexOf(require) === -1) {
                grunt.fail.warn("Missing provider : " + require + " is not provided !", 3)
                return false
            }
        }

        // create recursive method to list all requires of a source
        var recursiveListOfRequires = function(_object, _compiled, _listOfRequires) {
            for (var i = 0, length = _object.requires.length; i < length; i++) {
                var require = _object.requires[i]
                if (_listOfRequires.indexOf(require) === -1) {
                    _listOfRequires.push(require)
                    recursiveListOfRequires(_compiled[require], _compiled, _listOfRequires)
                }
            }
        }

        // loop on compiled sources to get a complete list of requires including parents requires
        for (var i = 0, length = compiledArray.length; i < length; i++) {
            // get the compile object
            var compile = compiledArray[i]
            // create an array for the full list of requires
            var listOfRequires = []
            // populate the list with the recursive method
            recursiveListOfRequires(compile, compiled, listOfRequires)
            // loop on provides of the object to find potential cyclic dependencies and prevent infinite loops
            for (var j = 0, l = compile.provides.length; j < l; j++) {
                // get the current provide
                var provide = compile.provides[j]
                // if the full list of requires contains the provide stop the task
                if (listOfRequires.indexOf(provide) !== -1) {
                    grunt.fail.fatal("Error : " + compile.source + " raised cyclic dependencies !")
                    return false
                }
            }
            // replace the requires array of the compile object with the full list
            compile.requires = listOfRequires
        }

        // Sort the compiled array according to dependencies
        compiledArray.sort(function(a, b) {
            // if a requires a provide of b return 1
            for (var i = 0, length = a.requires.length; i < length; i++) {
                if (b.provides.indexOf(a.requires[i]) > -1) {
                    return 1
                }
            }
            // if b requires a provide of a return -1
            for (var i = 0, length = b.requires.length; i < length; i++) {
                if (a.provides.indexOf(b.requires[i]) > -1) {
                    return -1
                }
            }
            // else return 0
            return 0

        })

        // create the results array containing sorted files
        var results = []
        // loop on the compiledArray and save sources into result 
        for (var i = 0, length = compiledArray.length; i < length; i++) {
            results.push(compiledArray[i].source)
        }

        if(debug) {
            grunt.log.writeln()
            grunt.log.writeln("SOURCES AFTER RESOLVE PHASE: \n" + results.join("\n"))
        }

        // return the results array
        return results
    }

}

module.exports = Util