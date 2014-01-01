# Load grunt API
grunt = require "grunt"

# Load path API
nodePath = require "path"

# System path separator
sep = nodePath.sep

###
Utility methods.
###
class GruntUtils

	###
	Shortcut for JSON.stringify(object, null, "    ")
	###
	toJSON: ( object ) ->
		return JSON.stringify object, null, "    "



	###
	Simply add a slash to a dir if there is not.
	###
	addSeparatorToPath: ( path ) ->
		dir = path
		if dir.charAt( dir.length - 1 ) isnt sep
			dir += sep
		return dir



	###
	An utility that sorts files acording to their dependencie->
	@provide & @require
	###
	resolveJavascriptDependencies: ( patterns, taskOptions ) ->

		# Get all non sorted sources
		sources = grunt.file.expand patterns
		ignoreList = grunt.file.expand taskOptions.ignore

		grunt.verbose.debug "List of files that will be ignored : #{ignoreList}"
		grunt.verbose.debug "\nSOURCES BEFORE RESOLVE PHASE: \n #{sources.join '\n'} \n"

		# Create the compiled object and array
		providerMap = {}
		nodes = []

		# Create all require and provide arr
		allRequires = []
		allProvides = []

		ignoreThisFile = false
		# Loop on all sources to find dependencies
		for source in sources

			grunt.verbose.debug "Current source: #{source}"

			# Tracking files to be ignored
			if source in ignoreList then ignoreThisFile = true else ignoreThisFile = false

			grunt.verbose.debug "Ignore: #{ignoreThisFile}"

			# Read the content of the source
			content = grunt.file.read source

			# Create require and provides arr
			requires = []
			provides = []
			provide = null

			# Skipping regexp search for files in ignoreList
			if !ignoreThisFile

				# Searching for require("id") expressions
				requireRegexp = /.*require\s*\(\s*"([^"])"\s*\).*/g
				match = requireRegexp.exec content
				while match?
					line = match[ 0 ]
					requireName = match[ 1 ]
					continue if line.indexOf( "@ignore" ) >= 0
					continue if line.indexOf( "//" ) >= 0 or line.indexOf( "/*" ) >= 0 or line.indexOf( "/**" ) >= 0
					requires.push requireName
					match = requireRegexp.exec content

				# Searching for define("id") expressions
				provideRegexp = /.*define\s*\(\s*"(^")"\s*,.*/g
				match = provideRegexp.exec content
				while match?
					line = match[ 0 ]
					provideName = match[ 1 ]
					continue if line.indexOf( "@ignore" ) >= 0
					continue if line.indexOf( "//" ) >= 0 or line.indexOf( "/*" ) >= 0 or line.indexOf( "/**" ) >= 0
					provides.push provideName
					match = provideRegexp.exec content


			# keeping only one provide per source
			if provides.length
				provide = provides[ 0 ].trim()
				allProvides.push provide

			# Find all lines containing @require
			requires = requires || []
			for require, j in requires
				# replace the current value in the array
				requires[ j ] = requires[ j ].trim()
				# save the value in the allRequires array
				if require not in allRequires
					allRequires.push require

			grunt.verbose.debug "In #{source}..."
			grunt.verbose.debug "     Provide: #{provide}"
			grunt.verbose.debug "     Requires: #{requires.join ' / '}"

			# Save information for the source into a dictionary object
			node =
				source: source
				requires: requires
				provide: provide

			# Save the compiled object to the nodes Array
			nodes.push node

			# Save the object into the compiled dictionnary with the provides as keys
			providerMap[ provide ] = node

		for node in nodes
			node.edges = []
			for require in node.requires
				# First, let's see if every requirehas a prov
				if require not in allProvides
					grunt.fail.warn "Missing provider : #{require} is not provided !", 3
				# Second, let's change require form from a string (provide) to an object n
				node.edges.push providerMap[ require ]

		# Final list of nodes in order
		resolved = []

		# Searching leafs nodes which are at the bottom of the tree
		leafs = []
		for node in nodes
			# Removing until there is only the leafs one
			if !node.edges.length || !node.provide
				resolved.push node
			else
				leafs.push node

		# Iiterative to climb the dependency tre->
		resolve = ( node, resolved, unresolved ) ->
			# Keeping track of yet unresolved nodes
			unresolved.push node

			for edge in node.edges
				if edge not in resolved
					# Checking cyclic dependencies
					if edge in unresolved
						grunt.fail.fatal "Error : #{node.source} raised cyclic dependencies !"

				# Digging again
				resolve( edge, resolved, unresolved )

			# Adding if not present in list of resolved nodes
			if node not in resolved
				resolved.push node

			# Removing from list of unresolved nodes
			positionInUnresolved = unresolved.indexOf node
			if positionInUnresolved >= 0
				unresolved.splice positionInUnresolved, 1

		# Climbing the resolve tree from the ground
		for node in leafs
			# For one path, we cannot have cyclic dependencies
			unresolved = []
			resolve node, resolved, unresolved

		results = []

		# Loop on the nodes and save sources into result
		for node in resolved
			results.push node.source

		grunt.verbose.debug "\nSOURCES AFTER RESOLVE PHASE: \n #{results.join '\n'}"

		# Return the results array
		return results



	###
	An utility that sorts files acording to their dependencie->
	@provide & @require
	###
	resolveSassDependencies: ( patterns ) ->

		# Get all non sorted sources
		sources = grunt.file.expand patterns

		grunt.verbose.debug "sources: #{@toJSON sources}"
		grunt.verbose.debug "\nSOURCES BEFORE RESOLVE PHASE: \n #{sources.join '\n'} \n"

		# Create the compiled object and array
		providerMap = {}
		nodes = []

		# Create all require and provide arr
		allRequires = []
		allProvides = []

		# Loop on all sources to find dependences
		for source in sources
			# Read the content of the source
			content = grunt.file.read source
			# Get all documentation block comments
			comments = content.match( /\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\//g ) || []

			# Create requires and provides arrays
			requires = []
			provides = []
			provide = null

			# Loop on the comments to get the requires and provides
			for comment in comments
				requires = requires.concat comment.match( /(@require).*/g ) || []
				provides = provides.concat comment.match( /(@provide).*/g ) || []

			# Keeping only one provide per source
			if provides.length
				provide = provides[ 0 ].replace( "@provide", "" ).trim()
				allProvides.push provide

			# Find all lines containing @require
			for require, j in requires
				# Replace the current value in the array
				requires[j] = requires[j].replace( "@require", "" ).trim()
				grunt.verbose.debug "requires[j]: #{@toJSON requires[j]}"
				# Save the value in the allRequires array
				if requires[j] not in allRequires
					allRequires.push requires[j]

			grunt.verbose.debug "requires: #{@toJSON requires}"
			grunt.verbose.debug "allRequires: #{@toJSON allRequires}"

			grunt.verbose.debug "In #{source}..."
			grunt.verbose.debug "     Provide: #{provide}"
			grunt.verbose.debug "     Requires: #{requires.join ' / '}"

			# Save information for the source into a dictionary object
			node =
				source: source
				requires: requires
				provide: provide

			# Save the compiled object to the nodes Array
			nodes.push node

			# Save the object into the compiled dictionnary with the provides as keys
			providerMap[ provide ] = node

		for node in nodes
			node.edges = []
			for require in node.requires
				# First, let's see if every require has a provide
				if require not in allProvides
					grunt.fail.warn "Missing provider : #{require} is not provided !", 3
				# Second, let's change require form from a string (provide) to an object node
				node.edges.push providerMap[ require]

		# Final list of nodes in order
		resolved = []

		# Searching leafs nodes which are at the bottom of the tree
		leafs = []
		for node in nodes
			# Removing until there is only the leafs one
			if !node.edges.length || !node.provide
				resolved.push node
			else
				leafs.push node

		# Iterative to climb the dependency tre->
		resolve = ( node, resolved, unresolved ) ->
			# Keeping track of yet unresolved nodes
			unresolved.push node

			for edge in node.edges
				if edge not in resolved
					# Checking cyclic dependencies
					if edge in unresolved
						grunt.fail.fatal "Error : #{node.source} raised cyclic dependencies !"
				# Digging again
				resolve edge, resolved, unresolved

			# Adding if not present in list of resolved nodes
			if node not in resolved
				resolved.push node

			# Removing from list of unresolved nodes
			positionInUnresolved = unresolved.indexOf node
			if positionInUnresolved >= 0
				unresolved.splice positionInUnresolved, 1

		# Climbing the resolve tree from the ground
		for node in leafs
			# For one path, we cannot have cyclic dependencies
			unresolved = []
			resolve node, resolved, unresolved

		results = []

		# Loop on the nodes and save sources into result
		for node in resolved
			results.push node.source

		grunt.verbose.debug "\nSOURCES AFTER RESOLVE PHASE: \n #{results.join '\n'}"

		# Return the results array
		return results


module.exports = new GruntUtils()