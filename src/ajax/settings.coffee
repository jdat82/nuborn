define "ajax#settings", ( require, exports, module ) ->

    'use strict'

    log = require "#log"
    Utils = require "utils.Utils"

    module.exports =

        # Timeout
        timeout: 30000

        # Forcing JSON for old devices which don't detect JSON automatically
        dataType: 'json'

        # Allowing cross domain requests
        # crossDomain: true

        # Enable Last-Modified and ETag headers
        # ifModified: true

        # Should we use cache ?
        # cache: false

        # Default max-age is 5 days
        # headers:
        #     'Cache-Control': 'public,max-age=432000'

        # Reusing the default mime-type of forms.
        # To better understand: http://stackoverflow.com/a/4073451
        # Already the jQuery default
        # contentType: "application/x-www-form-urlencoded charset=UTF-8"
