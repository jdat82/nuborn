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
                        target[name] = Util.jQueryExtend(deep, clone, copy)

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
     * Shortcut for JSON.stringify(object, null, "    ")
     */
    toJSON: function(object) {
        return JSON.stringify(object, null, "    ")
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
            grunt.log.writeln("SOURCES BEFORE RESOLVE PHASE: \n" + sources.join("\n") + "\n")
        }

        // Create the compiled object and array
        var providerMap = {}
        var nodes = []
        
        // Create all requires and provide arrays
        var allRequires = []
        var allProvides = []

        // Loop on all sources to find dependences
        sources.forEach(function(source)
        {
            // Read the content of the source
            var content = grunt.file.read(source)
            // Get all documentation block comments
            var comments = content.match(/\/\*\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\//g) || []

            // Create requires and provides arrays
            var requires = []
            var provides = []
            var provide = undefined

            // Loop on the comments to get the requires and provides
            comments.forEach(function(comment){
                requires = requires.concat(comment.match(/(@require).*/g) || [])
                provides = provides.concat(comment.match(/(@provide).*/g) || [])
            })

            // keeping only one provide per source
            if(provides.length) {
                provide = provides[0].replace("@provide", "").trim()
                allProvides.push(provide)
            }

            // Find all lines containing @require
            var requires = content.match(/(@require).*/g) || []
            for (var j = 0, lg = requires.length; j < lg; j++) {
                // replace the current value in the array
                requires[j] = requires[j].replace("@require", "").trim()
                // save the value in th allRequires array
                if (allRequires.indexOf(require) === -1) {
                    allRequires.push(require)
                }
            }

            if(debug) {
                grunt.log.writeln("In " + source + "...")
                grunt.log.writeln("     Provide: " + provide)
                grunt.log.writeln("     Requires: " + requires.join(" / "))
            }

            // save information for the source into a dictionary object
            var node = {
                source: source,
                requires: requires,
                provide: provide
            }

            // save the compiled object to the nodes Array
            nodes.push(node) 

            // save the object into the compiled dictionnary with the provides as keys
            providerMap[provide] = node
        })

        // Loop on allRequires to check if all requires has a corresponding provide
        // for (var i = 0, length = allRequires.length; i < length; i++) {
        //     var require = allRequires[i]
        //     if (allProvides.indexOf(require) === -1) {
        //         grunt.fail.warn("Missing provider : " + require + " is not provided !", 3)
        //         return false
        //     }
        // }

        nodes.forEach(function(node){
            node.edges = []
            node.requires.forEach(function(require){

                // first, let's see if every require has a provide
                if (allProvides.indexOf(require) === -1) {
                    grunt.fail.warn("Missing provider : " + require + " is not provided !", 3)
                    grunt.log.writeln("\n\n SHOULD NOT BE PRINTED \n\n")
                }

                // second, let's change requires form from a string (provide) to an object node
                node.edges.push(providerMap[require])
            })
        })

        // def dep_resolve(node, resolved, unresolved):
        // unresolved.append(node)
        // for edge in node.edges:
        //       if edge not in resolved:
        //              if edge in unresolved:
        //                     raise Exception('Circular reference detected: %s -> %s' % (node.name, edge.name))
        //              dep_resolve(edge, resolved, unresolved)
        // resolved.append(node)
        // unresolved.remove(node)

        // final list of nodes in order
        var resolved=[]
        grunt.log.writeln("\n NODES: \n" + Util.toJSON(nodes))
        
        // searching leafs nodes which are at the bottom of the tree
        var leafs = []
        nodes.forEach(function(node){
            // removing until there is only the leafs one
            if(!node.edges.length || !node.provide)
                resolved.push(node)
            else 
                leafs.push(node)
        })

        grunt.log.writeln("\n LEAFS NODES: \n" + leafs.length)
        grunt.log.writeln("\n LEAFS NODES: \n" + Util.toJSON(leafs))
        grunt.log.writeln("\n ALREADY RESOLVED NODES: \n" + Util.toJSON(nodes))

        var resolve = function(node, resolved, unresolved) {
            grunt.log.writeln("πππππππππππππππππππππππππππππππππππππππππππππππππππππππ")
            unresolved.push(node)
            grunt.log.writeln(node.source + ": " + Util.toJSON(node.requires))
            node.edges.forEach(function(edge){
                if(resolved.indexOf(edge) < 0)
                    // checking cyclic dependencies
                    if(unresolved.indexOf(edge) >= 0)
                        grunt.fail.fatal("Error : " + node.source + " raised cyclic dependencies !")
                    // digging again
                    resolve(edge, resolved, unresolved)
            })
            resolved.push(node)
            unresolved.splice(unresolved.indexOf(node), 1)
        }

        grunt.log.writeln("œœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœœ")

        // climbing the resolve tree from the ground
        leafs.forEach(function(node){
            // for one path, we cannot have cyclic dependencies
            var unresolved=[]
            resolve(node, resolved, unresolved)
        })


        // // create recursive method to list all requires of a source
        // var recursiveListOfRequires = function(_object, _compiled, _listOfRequires) {
        //     for (var i = 0, length = _object.requires.length; i < length; i++) {
        //         var require = _object.requires[i]
        //         if (_listOfRequires.indexOf(require) === -1) {
        //             _listOfRequires.push(require)
        //             recursiveListOfRequires(_compiled[require], _compiled, _listOfRequires)
        //         }
        //     }
        // }

        // // loop on compiled sources to get a complete list of requires including parents requires
        // for (var i = 0, length = nodes.length; i < length; i++) {
        //     // get the compile object
        //     var compile = nodes[i]
        //     // create an array for the full list of requires
        //     var listOfRequires = []
        //     // populate the list with the recursive method
        //     recursiveListOfRequires(compile, compiled, listOfRequires)
        //     // loop on provides of the object to find potential cyclic dependencies and prevent infinite loops
        //     for (var j = 0, l = compile.provides.length; j < l; j++) {
        //         // get the current provide
        //         var provide = compile.provides[j]
        //         // if the full list of requires contains the provide stop the task
        //         if (listOfRequires.indexOf(provide) !== -1) {
        //             grunt.fail.fatal("Error : " + compile.source + " raised cyclic dependencies !")
        //             return false
        //         }
        //     }
        //     // replace the requires array of the compile object with the full list
        //     compile.requires = listOfRequires
        // }

        // if(debug)
        //     grunt.log.writeln("\nDEPENDENCY TREE: \n" + Util.toJSON(nodes))

        // // Sort the compiled array according to dependencies
        // nodes.sort(function(a, b) 
        // {
        //     // if a requires a provide of b return 1
        //     for (var i = 0, length = a.requires.length; i < length; i++) {
        //         if (b.provides.indexOf(a.requires[i]) > -1) {
        //             if(debug)
        //                 grunt.log.writeln("a: " + a.source + " b: " + b.source + " res: 1")
        //             return 1
        //         }
        //     }
        //     // if b requires a provide of a return -1
        //     for (var i = 0, length = b.requires.length; i < length; i++) {
        //         if (a.provides.indexOf(b.requires[i]) > -1) {
        //             if(debug)
        //                 grunt.log.writeln("a: " + a.source + " b: " + b.source + " res: -1")
        //             return -1
        //         }
        //     }

        //     if(debug)
        //         grunt.log.writeln("a: " + a.source + " b: " + b.source + " res: 0")

        //     // else return 0
        //     return 0

        // })

        if(debug)
            grunt.log.writeln("\nDEPENDENCY TREE AFTER SORT: \n" + Util.toJSON(nodes))

        var results = []

        // loop on the nodes and save sources into result 
        resolved.forEach(function(node){
            results.push(node.source)
        })

        if(debug)
            grunt.log.writeln("\nSOURCES AFTER RESOLVE PHASE: \n" + results.join("\n"))

        // return the results array
        return results
    }

}

module.exports = Util