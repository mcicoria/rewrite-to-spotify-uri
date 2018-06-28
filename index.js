const url = require('url');
const urlRegex = require('url-regex');

const RewriteToSpotifyURI = (function () {
	const that = this;

	const uriTypes = [
		'user',
		'track',
		'playlist',
		'album',
		'artist',
		'show',
		'episode'
	];

	const spotifyUriRegExp = new RegExp('spotify:(' + uriTypes.join('|') + '):([A-z]|\\d)+(:|[A-z]|\\d)+', 'ig');

	that.replaceAll = function (str, search, replacement) {
		return str.split(search).join(replacement);
	};

	that.isSpotifyUri = function (uri) {
		const matches = that.extractSpotifyUris(uri);
		return Boolean(matches && matches.length > 0);
	};

	that.extractSpotifyUris = function (str) {
		if (!str || !str.match) {
			return [];
		}

		return str.match(spotifyUriRegExp);
	};

	that.isSpotifyLink = function (uri) {
		// Like open.spotify.com/track/6NqSdmfeXJv5JnupGOJ3rX?si=6yLppw_TQqG-5-onueTHbQ
		let uriObj = url.parse(uri);
		if (!uriObj.host) {
			uriObj = url.parse('http://' + uri);
		}

		return (uriObj.host && uriObj.host.toLowerCase() === 'open.spotify.com');
	};

	that.extractUris = function (str) {
		if (!str || !str.match) {
			return str;
		}

		let uris = str.match(urlRegex({
			strict: false
		})) || [];

		const spotifyUris = that.extractSpotifyUris(str) || [];

		uris = uris.filter(that.isSpotifyLink).concat(spotifyUris);

		return uris || [];
	};

	that.rewrite = function (str) {
		const uris = that.extractUris(str);

		if (!uris || uris.length <= 0) {
			return str;
		}

		uris.forEach(s => {
			str = that.replaceAll(str, s, that.rewriteUri(s));
		});

		return str;
	};

	that.rewriteUri = function (uri) {
		if (that.isSpotifyUri(uri)) {
			return uri.replace('spotify:', 'spotify://');
		}

		let uriObj = url.parse(uri);

		if (!uriObj.host) {
			uriObj = url.parse('http://' + uri);
		}

		return 'spotify:/' + uriObj.path;
	};

	return that;
})();

module.exports = RewriteToSpotifyURI;
