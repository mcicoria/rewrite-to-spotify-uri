# rewrite-to-spotify-uri [![Build Status](http://img.shields.io/travis/mcicoria/rewrite-to-spotify-uri.svg?style=flat)](https://travis-ci.org/mcicoria/rewrite-to-spotify-uri)

Rewrites all Spotify links and uris like:  
```
https://open.spotify.com/user/markcicoria/playlist/2Wz5C4qI9cpOV0xWurixU0?si=9VHvI4znToSovfHHUSdEpw   
spotify:user:markcicoria:playlist:2Wz5C4qI9cpOV0xWurixU0  
```
To Spotify application links like:  
```spotify://user:markcicoria:playlist:2Wz5C4qI9cpOV0xWurixU0```  


## Install

```
$ npm install --save rewrite-to-spotify-uri
```

## Test

```
$ npm test
```
Or watch with:
```
$ npm test -- --watch
```

## Usage

```js
const rewriteSpotifyUri = require('rewrite-to-spotify-uri');

rewriteSpotifyUri.rewrite('spotify:user:markcicoria:playlist:2Wz5C4qI9cpOV0xWurixU0 foo bar');
//=> spotify://user:markcicoria:playlist:2Wz5C4qI9cpOV0xWurixU0 foo bar

rewriteSpotifyUri.rewrite('https://open.spotify.com/user/markcicoria/playlist/2Wz5C4qI9cpOV0xWurixU0?si=9VHvI4znToSovfHHUSdEpw foo bar spotify:track:6JD5hXgXe7z5edGKpQK0AE');
//=> spotify://user/markcicoria/playlist/2Wz5C4qI9cpOV0xWurixU0?si=9VHvI4znToSovfHHUSdEpw foo bar spotify://track:6JD5hXgXe7z5edGKpQK0AE

rewriteSpotifyUri.isSpotifyUri('http://github.com');
//=> false

rewriteSpotifyUri.isSpotifyUri('spotify:user:markcicoria:playlist:2Wz5C4qI9cpOV0xWurixU0');
//=> true

rewriteSpotifyUri.isSpotifyUri('https://open.spotify.com/user/markcicoria/playlist/2Wz5C4qI9cpOV0xWurixU0?si=9VHvI4znToSovfHHUSdEpw');
//=> false

rewriteSpotifyUri.isSpotifyLink('https://open.spotify.com/user/markcicoria/playlist/2Wz5C4qI9cpOV0xWurixU0?si=9VHvI4znToSovfHHUSdEpw');
//=> true

rewriteSpotifyUri.extractUris('https://open.spotify.com/user/markcicoria/playlist/2Wz5C4qI9cpOV0xWurixU0?si=9VHvI4znToSovfHHUSdEpw foo bar spotify:track:6JD5hXgXe7z5edGKpQK0AE');
//=> ['https://open.spotify.com/user/markcicoria/playlist/2Wz5C4qI9cpOV0xWurixU0?si=9VHvI4znToSovfHHUSdEpw', 'spotify:track:6JD5hXgXe7z5edGKpQK0AE']

rewriteSpotifyUri.extractSpotifyUris('https://open.spotify.com/user/markcicoria/playlist/2Wz5C4qI9cpOV0xWurixU0?si=9VHvI4znToSovfHHUSdEpw foo bar spotify:track:6JD5hXgXe7z5edGKpQK0AE');
//=> ['spotify:track:6JD5hXgXe7z5edGKpQK0AE']
```


## API

### rewrite(string)

Returns a string with all Spotify links and uris replaced with the spotify:// version.

### isSpotifyUri(string)

Returns a boolean. True if the string is a Spotify uri like `spotify:track:id`, false otherwise.

### isSpotifyLink(string)

Returns a boolean. True if the string is a Spotify uri like `open.spotify://track/id`, false otherwise.

### extractUris(string)

Returns an array of matched Spotify links and uris.

### extractSpotifyUris(string)

Returns an array of matched Spotify uris only.


## Related

- [get-urls](https://github.com/sindresorhus/get-urls) - Get all URLs in text
- [linkify-urls](https://github.com/sindresorhus/linkify-urls) - Linkify URLs in text


## License

MIT © [Mark Cicoria](https://github.com/mcicoria), [Kevin Mårtensson](https://github.com/kevva), and [Diego Perini](https://github.com/dperini)
