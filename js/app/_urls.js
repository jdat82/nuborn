// ici on définit les réseaux et les urls utilisées par l'application
// pratique pendant les développements pour pointer sur différents serveurs ou mocker certains services
$.it.urls.extend({
	network: {
		"dev": { "host": "http://inmp.dev.itlabs.fr:8888/", "default": true },
		"mock": { "host": "mock/"},
		"recette": { "host": "your_host" }
	},
	services: {
		"config-load": {
			url: "configuration.json",
			network: "mock"
		},
		"wording-load": {
			url: "wordings.json",
			network: "mock"
		},
		"votre-service": {
			url: "votre_url"
			// le réseau par défaut sera utilisé si pas de réseau explicite
		}
	}
});