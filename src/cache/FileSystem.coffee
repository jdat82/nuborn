define "cache.FileSystem", ( require, exports, module ) ->

    'use strict'

    $ = jQuery
    log = require "#log"
    Utils = require "utils.Utils"
    BrowserUtils = require "utils.BrowserUtils"



    ###*
    @private
    Root filesystem on Cordova platform.
    ###
    rootFS = null

    defaults =
        skipDownload: false
        headers:
            "Cache-Control": "public, max-age=2592000" # Caching : max 1 month

    ###*
     @class cache.FileSystemCache
     @singleton
     [CORDOVA ONLY]
     Helper class to download and cache in file system remote resources.
    ###
    class FileSystemCache

        constructor: () ->
            # Asynchronous call
            # So we will do our taff while we are trying to acquire a reference to the file system.
            # No need to wait for the response as there is a lot of other asynchronous task to execute
            # and this one is very quick
            createRootFileSystem()

        ###*
         Donwload and save in file system a remote resource. Resources are saved in
         the temporary folder.
         @return the local path of the resource (either it was already in cache or was downloaded).
         @param {String} url Remote adress
         @param {Object} settings Options :
         - skipDownload: if true, do not try to download, just check existence, even if not in cache
         - key: to override the default name strategy which is to replace all ":"" and "/" characters with "_"
        ###
        cache: ( url, settings ) ->

            dfd = $.Deferred()

            if !BrowserUtils.isCordova() && !window?.FileTransfer
                errorMsg = "Can't cache in file system without Cordova FileTransfer API"
                log.w errorMsg
                dfd.rejectWith errorMsg
                return dfd.promise()

            if !url?.length
                errorMsg = "Missing URL"
                Log.w errorMsg
                dfd.rejectWith errorMsg
                return dfd.promise()

            settings = $.extend true, {}, defaults, settings

            url = encodeURI url
            key = settings.key or url.replace( /[:\/]/g, "_" )
            filePath = rootFS.fullPath + "/" + key

            # Cordova getFile implementation is stupid
            if ANDROID
                filePath = filePath.replace "file://", ""

            log.t "filePath: #{filePath}" if TRACE

            fileDoesntExists = ( error ) ->

                log.d "Resource with key '#{key}' not in file system" if DEBUG

                if settings.skipDownload
                    dfd.resolve()
                else
                    # If it wasn't already downloaded
                    fileTransfer = new FileTransfer()

                    # Downloading the logo and saving it to the file system
                    fileTransfer.download(
                        url,
                        filePath,
                        ( entry ) =>
                            log.d "Download complete: #{entry.fullPath}" if DEBUG
                            # Returning a local URI
                            dfd.resolveWith entry.fullPath
                        ,
                        ( error ) =>
                            log.e "Download error : ", error if DEBUG
                            dfd.rejectWith error
                        ,
                        false, {
                            headers: settings.headers
                        }
                    )

            fileExists = ( fileEntry ) =>
                log.d "A copy of media #{key} already in cache (file system)" if DEBUG
                # Returning a local URI
                dfd.resolveWith fileEntry.fullPath

            # Checking if we already have this resource in file system
            rootFS.getFile( filePath, {
                create: false
            }, fileExists, fileDoesntExists)


            return dfd.promise()



    ###*
    For Cordova platform only.
    Get a reference to the root filesystem accessible to the current application.
    ###
    createRootFileSystem() ->

        window.requestFileSystem and window.requestFileSystem( LocalFileSystem.TEMPORARY, 0, ( fileSystem ) ->

            # Keeping a reference to our file system
            rootFS = fileSystem.root

            log.d "FileSystem root: #{rootFS.fullPath}" if DEBUG

        , ( error ) ->
            logFileError error, "Error getting LocalFileSystem: "
        )


    ###*
    Log a Cordova FileError.
    ###
    logFileError( error, message ) ->

        errorCodes = {}
        errorCodes[ FileError.NOT_FOUND_ERR ] = "NOT_FOUND_ERR"
        errorCodes[ FileError.SECURITY_ERR ] = "SECURITY_ERR"
        errorCodes[ FileError.ABORT_ERR ] = "ABORT_ERR"
        errorCodes[ FileError.NOT_READABLE_ERR ] = "NOT_READABLE_ERR"
        errorCodes[ FileError.ENCODING_ERR ] = "ENCODING_ERR"
        errorCodes[ FileError.NO_MODIFICATION_ALLOWED_ERR ] = "NO_MODIFICATION_ALLOWED_ERR"
        errorCodes[ FileError.INVALID_STATE_ERR ] = "INVALID_STATE_ERR"
        errorCodes[ FileError.SYNTAX_ERR ] = "SYNTAX_ERR"
        errorCodes[ FileError.INVALID_MODIFICATION_ERR ] = "INVALID_MODIFICATION_ERR"
        errorCodes[ FileError.QUOTA_EXCEEDED_ERR ] = "QUOTA_EXCEEDED_ERR"
        errorCodes[ FileError.TYPE_MISMATCH_ERR ] = "TYPE_MISMATCH_ERR"
        errorCodes[ FileError.PATH_EXISTS_ER ] = "PATH_EXISTS_ERR"

        Log.e( message + errorCodes[ error.code ] )



    module.exports = FileSystemCache

###
The shared instance
###
define "cache#file", ( require, exports, module ) ->

    'use strict'

    FileSystemCache = require "cache.FileSystemCache"
    module.exports = new FileSystemCache()