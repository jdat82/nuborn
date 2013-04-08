
var Status = Object.subClass(
{
	// @param code: code représentant un état
	// @param message: description de l'état
	// @param args: arguments contextuels représentant l'état
	// @param error: erreur relative à l'état
	init: function(code, message, args, error)
	{
		this.code = code;
		this.message = message;
		this.args = args;
		this.error = error;
	}
});

var GenericStatus = {

	// code générique pour indiquer un succès
	OK: 0,

	// code générique pour indiquer un échec
	NOK: 1

};
