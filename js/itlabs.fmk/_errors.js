
// Gestion des erreurs globales de l'application

var ErrorHelper = Object.subClass(
{
    // showConnectivityError : affiche un message d'erreur lié a la non connectivité du device
    showConnectivityError: function()
    {
        var message = $.it.wordings.msg("connectivity-error");
        var callback = null;
        var title = $.it.wordings.msg("connectivity-error-header");
        $.it.toolbox.alert(message, callback, title);
    },


    // showInitFatalError : affiche un message d'erreur lié à une erreur fatale au démarrage
    showInitFatalError: function()
    {
        var message = $.it.wordings.msg("init-fatal-error");
        var callback = null;
        var title = $.it.wordings.msg("error");
        $.it.toolbox.alert(message, callback, title);
    },


    // showTechnicalError : affiche un message d'erreur indiquant une erreur technique
    showTechnicalError: function()
    {
        var message = $.it.wordings.msg("technical-error");
        var callback = null;
        var title = $.it.wordings.msg("technical-error-header");
        $.it.toolbox.alert(message, callback, title);
    },


    // showTimeoutSessionError : affiche un message d'erreur indiquant un timeout de session
    showTimeoutSessionError: function(callback)
    {
        var message = $.it.wordings.msg("timeout-session-error");
        var title = $.it.wordings.msg("timeout-session-error-header");
        $.it.toolbox.alert(message, callback, title);
    }

});

$.it.error = new ErrorHelper();