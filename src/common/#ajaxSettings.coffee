define "#ajaxSettings", ( require, exports, module ) ->

    'use strict'


    module.exports =

        # Timeout des requetes Ajax
        timeout: 30000

        # On reçoit du JSON
        dataType: 'json'

        # Allowing cross domain requests
        crossDomain: true

        # Enable Last-Modified and ETag headers
        # ifModified: true

        # On active le cache sur les requêtes Ajax
        # cache: false

        # Default max-age is 5 days
        # headers:
        #     'Cache-Control': 'public,max-age=432000'

        # Par défaut, les requête sont envoyées en tant que formulaire encodés en UTF-8
        contentType: "application/x-www-form-urlencoded charset=UTF-8"

