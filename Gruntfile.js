/**
 * Grunt Configuration
 */
module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-jsduck');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.initConfig({

		

	/**
	 * Loading Tasks
	 */
	//grunt.loadNpmTasks('grunt-nuborn');

	/**
	 * Registering Default Task
	 */
	grunt.registerTask("default", function() {
		//grunt.task.run("nuborn");
	});

};