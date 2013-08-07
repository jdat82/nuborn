(function ($, nu, window, undefined) {

	/**
	 * @class nu.debug.Log
	 * @singleton
	 *
	 * @provide nu.debug.Log
	 *
	 * @require nu.debug.LogLevel
	 *
	 * @require nu.debug.LogItem
	 *
	 * @require nu.Storage
	 */
	nu.debug.Log = {};

	/**
	 * Log the value parameter with the level specified.
	 * @param  {String} value The value to log
	 * @param  {String} level The level of the log
	 */
	nu.debug.Log.log = function (value, level) {
		// if no value is specified, log error and stop the process
		if (!value) {
			nu.debug.Log.e("nu.debug.Log called without content");
			return;
		}
		// getting the value as a string
		var val = value.toString();
		// declaring the method of the console to call
		var method = null;
		// declaring the value to save in storage
		var storage = val;
		// declaring the value to save to the stack memory
		var stack = val;
		// declaring date of the current log action
		var date = new Date();
		// checking the level, default is INFO
		switch (level) {
		case nu.debug.LogLevel.ERROR:
			// if it is an error, we save the error with its stack trace
			storage = stack = new Error(val).stack;
			// calling console.error if it is an error
			method = "error";
			break;
		case nu.debug.LogLevel.WARN:
			// calling console.warn if it is a warning
			method = "warn";
			break;
		default:
			// setting the level to INFO by default
			level = nu.debug.LogLevel.INFO;
			// calling console.info if it is an info
			method = "info";
			break;
		}
		var logItem = new nu.debug.LogItem(level, val, date);
		// if the level is activated
		if (nu.debug.Log.level === nu.debug.LogLevel.ALL || nu.debug.Log.level.contains(level)) {
			// if console is activated for logs
			if (nu.debug.Log.consoled) {
				// call the correct method on the console object
				console[method](val);
			}

			if (nu.debug.Log.stacked) {
				// get the logs from the memory stack
				var log = nu.debug.Log.stack;
				// if log is null, initialize it
				if (!log) {
					log = {};
					for (var level in nu.debug.LogLevel)
						log[level] = []
					nu.debug.Log.stack = log;
				}
				// unshifting the log into the stack memory with the date
				log[level].unshift(logItem);
				log[nu.debug.LogLevel.ALL].unshift(logItem);
			}

			// if storage is activated for logs
			if (nu.debug.Log.storaged) {
				// getting the log object
				var log = nu.debug.Log.getStoraged();
				// unshifting the correct value into the correct array member with the date
				log[level].unshift(logItem);
				log[nu.debug.LogLevel.ALL].unshift(logItem);
				// saving log object into the storage
				nu.debug.Log.setStoraged(log);
			}
		}
	};

	/**
	 * Logs informations.
	 * @param  {String} value The information to log
	 */
	nu.debug.Log.info = function (value) {
		nu.debug.Log.log(value, nu.debug.LogLevel.INFO);
	};

	/**
	 * @method i
	 * @inheritdoc #info
	 */
	nu.debug.Log.i = nu.debug.Log.info;

	/**
	 * Logs errors.
	 * @param  {String} value The error to log
	 */
	nu.debug.Log.error = function (value) {
		nu.debug.Log.log(value, nu.debug.LogLevel.ERROR);
	};

	/**
	 * @method e
	 * @inheritdoc #error
	 */
	nu.debug.Log.e = nu.debug.Log.error;

	/**
	 * Logs warnings.
	 * @param  {String} value The warning to log
	 */
	nu.debug.Log.warn = function (value) {
		nu.debug.Log.log(value, nu.debug.LogLevel.WARN);
	};

	/**
	 * @method w
	 * @inheritdoc #warn
	 */
	nu.debug.Log.w = nu.debug.Log.warn;

	/**
	 * Gets the saved logs object or a new one.
	 * @return {Object} The saved object containing infos, errors and warnings logs, or a new one
	 */
	nu.debug.Log.getStoraged = function () {
		// getting logs from object storage
		var log = nu.Storage.get(nu.debug.Log.STORAGE_KEY);
		// if log is null, create a new one and save it
		if (!log) {
			// creating the new log object
			log = {};
			for (var level in nu.debug.LogLevel)
				log[level] = []
				// saving the object to the object storage
			nu.debug.Log.setStoraged(log);
		}
		// return the log object
		return log;
	};

	/**
	 * Saves the log parameter into storage.
	 * @param {Object} log The log object to save
	 */
	nu.debug.Log.setStoraged = function (log) {
		nu.Storage.set(nu.debug.Log.STORAGE_KEY, log);
	};

	/**
	 * List log of type from the storage.
	 * @param  {String} type The type of log to list
	 */
	nu.debug.Log.listStoraged = function (type) {
		var log = nu.debug.Log.getStoraged();
		var array = log[type];

		if (!array) {
			console.log("The type " + type + "is incorrect");
			return;
		}

		if (array.length === 0) {
			console.log("There is no logs with type" + type);
			return;
		}

		type !== nu.debug.LogLevel.ALL && console.log("List of logs with type " + type + " :");
		for (var i = 0, len = array.length; i < len; i++) {
			console.log("    * " + array[i]);
		}
		type !== nu.debug.LogLevel.ALL && console.log("End of logs with type " + type);
	};

	/**
	 * List log of type from the stack memory.
	 * @param  {String} type The type of log to list
	 */
	nu.debug.Log.listStacked = function (type) {
		// if teh stack is null, no log has been stacked
		if (!nu.debug.Log.stack) {
			console.log("There is no logs in the stack memory");
			return;
		}
		type = type || nu.debug.LogLevel.ALL;
		var log = nu.debug.Log.stack;
		var array = log[type];

		if (array.length === 0) {
			console.log("There is no logs with type" + type);
			return;
		}

		type !== nu.debug.LogLevel.ALL && console.log("List of logs with type " + type + " :");
		for (var i = 0, len = array.length; i < len; i++) {
			console.log(" >> " + array[i]);
		}
		type !== nu.debug.LogLevel.ALL && console.log("End of logs with type " + type);
	};

	/**
	 * Clear logs of type from storaged.
	 * @param  {String} type The type of log to clear
	 */
	nu.debug.Log.clearStoraged = function (type) {
		// getting the log object
		var log = nu.debug.Log.getStoraged();
		// check if the type is specified and correct
		if (type === nu.debug.LogLevel.INFO || type === nu.debug.LogLevel.ERROR || type === nu.debug.LogLevel.WARN) {
			log[type] = [];
		}
		// if no type is specified or is incorrect, clear all
		else if (type === nu.debug.LogLevel.ALL) {
			for (var level in nu.debug.LogLevel)
				log[level] = []
		}
		nu.debug.Log.setStoraged(log);
	};

	/**
	 * Clear logs of type from stack memory.
	 * @param  {String} type The type of log to clear
	 */
	nu.debug.Log.clearStacked = function (type) {
		// getting the log object
		var log = nu.debug.Log.stack;
		// check if the type is specified and correct
		if (type === nu.debug.LogLevel.INFO || type === nu.debug.LogLevel.ERROR || type === nu.debug.LogLevel.WARN) {
			log[type] = [];
		}
		// if no type is specified or is incorrect, clear all
		else if (type === nu.debug.LogLevel.ALL) {
			for (var level in nu.debug.LogLevel)
				log[level] = []
		}
	};

	/**
	 * Const Key for saving logs into object storage.
	 * @type {String}
	 */
	nu.debug.Log.STORAGE_KEY = "nuborn.log";

	/**
	 * Defines if the logs should be sent to console.
	 * @type {Boolean}
	 */
	nu.debug.Log.consoled = true;

	/**
	 * Defines if the logs should be saved to storage.
	 * @type {Boolean}
	 */
	nu.debug.Log.storaged = false;

	/**
	 * Defines if the logs should be saved to the stack memory.
	 * @type {Boolean}
	 */
	nu.debug.Log.stacked = true;

	/**
	 * Defines the level of the logs : can be a combination of different levels separated by | (pipe).
	 * @type {String}
	 */
	nu.debug.Log.level = nu.debug.LogLevel.ALL;

	/**
	 * Deactivated for now cause doesn't work as expected.
	 */
	// window.onerror = function (message, url, line) {
	//	nu.debug.Log.error(message);
	// }

})(jQuery, nu, window);