/**
 * Modify watch configuration so as to we can build only active targets on watch event.
 * TODO : replace by a transversal mean (nuborn plugin ?) to intercept all tasks run in grunt and modify its scope
 * based on targets configuration. This process is necessary everywhere, not just for watch.
 * grunt or grunt:<task> should build only the active ones in a perfect world without needing us
 * to specify a target.
 */

function supervizeWatch(grunt) {
	var targets = activeTargets(grunt);

	if (!targets.length)
		return;

	var watch = grunt.config("watch");

	for (var watchTarget in watch) {

		var newTasks = [];
		var watchTasks = watch[watchTarget].tasks;

		if (!watchTasks)
			continue;

		targets.forEach(function(targetName) {
			watchTasks.forEach(function(watchTask) {
				if (watchTask.match(/:/g)) {
					newTasks.push(watchTask);
				} else {
					newTasks.push(watchTask + ":" + targetName);
				}
			});
		});

		grunt.config("watch." + watchTarget + ".tasks", newTasks);
	}
}

/**
 * Compute an array of all active target names.
 */

function activeTargets(grunt) {
	var targets = grunt.config("targets");
	var result = [];

	if (!targets)
		return result;

	for (var targetName in targets)
		if (targets[targetName].active)
			result.push(targetName);

	return result;
}

module.exports = {
	optimize: supervizeWatch
}