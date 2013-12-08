define( "app.manager.SettingsManager", function ( require, exports, module ) {

    'use strict';

    var $ = jQuery;
    var Log = require( "nu.debug.Log" );
    var Constants = require( "app.Constants" );
    var LocalStorage = require( "nu.cache.LocalStorage" );
    var StressTest = require( "nu.widgets.StressTest" );

    /*
     * Private data.
     */
    var data = {};

    /**
     * @class app.manager.SettingsManager
     * @singleton
     * Service that manage application settings.
     */
    module.exports = {

        /**
         * @constructor
         */
        init: function () {},

        /**
         * Inverse animation friendly value.
         */
        toggleAnimationFriendly: function () {
            this.animationFriendly( !this.animationFriendly() );
        },

        /**
         * Getter and Setter for animation friendly setting.
         * Historically, this param is handled by Modernizr.
         * Unfortunately, there is no mean to update a Modernizr test.
         * So we need to fall back to manual handling. That's a shame.
         *
         * @param {Boolean} enable (optional).
         * If no param, return the current value.
         * If true or false, setting is changed.
         */
        animationFriendly: function ( enable ) {

            var current = Modernizr.animationfriendly;
            // getter
            if ( enable === undefined ) {
                return current;
            }

            // if setting unchanged: nothing to do
            var newValue = ( enable === true );
            if ( current === newValue ) return;

            // setter
            var currentCssClass;
            if ( current )
                currentCssClass = StressTest.KEY_ANIMATIONFRIENDLY;
            else
                currentCssClass = StressTest.KEY_NO_ANIMATIONFRIENDLY;

            Modernizr.animationfriendly = newValue;

            var newCssClass;
            if ( newValue )
                newCssClass = StressTest.KEY_ANIMATIONFRIENDLY;
            else
                newCssClass = StressTest.KEY_NO_ANIMATIONFRIENDLY;

            var $html = $( "html" );
            $html.removeClass( currentCssClass );
            $html.addClass( newCssClass );

            // saved in localstorage
            LocalStorage.set( StressTest.KEY_ANIMATIONFRIENDLY, newValue );

            Log.i( "Animation friendly: " + newValue );
        },

        logsRecording: function () {
            return Log.channel( Log.CHANNEL_STORAGE ) !== undefined;
        },

        toggleLogsRecording: function () {
            var storageChannel = Log.channel( Log.CHANNEL_STORAGE );
            var storageEnabled = storageChannel !== undefined;
            // before deactivating the storage channel, I prefer to clear it to avoid an endless growing log
            if ( storageEnabled && storageChannel ) {
                storageChannel.clear();
            }
            // handling change event
            Log.channel( Log.CHANNEL_STORAGE, !storageEnabled );

            Log.i( "Logs recording: " + !storageEnabled );
        }
    };

} );