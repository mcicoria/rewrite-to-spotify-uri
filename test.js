import test from 'ava';
import {rewrite, isSpotifyLink, isSpotifyUri, extractSpotifyUris, extractUris} from '.';

// ({ rewrite, isSpotifyLink }) = m;
// const rewrite = m.rewrite;
// const isSpotifyLink = m.isSpotifyLink;
// const isSpotifyUri = m.isSpotifyUri;

test('isSpotifyLink', t => {
	const trueLinks = [
		'http://open.spotify.com/track/6NqSdmfeXJv5JnupGOJ3rX?si=6yLppw_TQqG-5-onueTHbQ',
		'https://open.spotify.com/artist/57aX19q7mKEOq5Y6FrHoh2?si=QrFQjcqKR9-BK0XZYUFwrQ'
	];

	for (const x of trueLinks) {
		t.true(isSpotifyLink(x));
	}
});

test('isSpotifyUri', t => {
	const trueUris = [
		'spotify:track:2Cbyw9Q0BNykoSBflF9tZl',
		'spotify:artist:5OvI3XKz7Y1TJAxPbn848T',
		'spotify:user:markcicoria:playlist:2Wz5C4qI9cpOV0xWurixU0',
		'spotify:track:6NqSdmfeXJv5JnupGOJ3rX'
	];

	for (const x of trueUris) {
		t.true(isSpotifyUri(x));
	}

	const falseUris = [
		'spotify:ftrack:2Cbyw9Q0BNykoSBflF9tZl',
		'https://open.spotify.com/artist/57aX19q7mKEOq5Y6FrHoh2?si=QrFQjcqKR9-BK0XZYUFwrQ'
	];

	for (const y of falseUris) {
		t.false(isSpotifyUri(y));
	}
});

test('extractSpotifyUris', t => {
	const trueUris = [
		'spotify:track:2Cbyw9Q0BNykoSBflF9tZl',
		'spotify:artist:5OvI3XKz7Y1TJAxPbn848T',
		'spotify:user:markcicoria:playlist:2Wz5C4qI9cpOV0xWurixU0',
		'spotify:track:6NqSdmfeXJv5JnupGOJ3rX'
	];

	for (const x of trueUris) {
		t.deepEqual(extractSpotifyUris('123 ' + x + ' 456'), [x]);
	}
});

test('extractUris', t => {
	const trueUris = [
		'spotify:track:2Cbyw9Q0BNykoSBflF9tZl',
		'spotify:artist:5OvI3XKz7Y1TJAxPbn848T',
		'spotify:user:markcicoria:playlist:2Wz5C4qI9cpOV0xWurixU0',
		'spotify:track:6NqSdmfeXJv5JnupGOJ3rX',
		'https://open.spotify.com/artist/57aX19q7mKEOq5Y6FrHoh2?si=QrFQjcqKR9-BK0XZYUFwrQ'
	];

	for (const x of trueUris) {
		t.deepEqual(extractUris('123 ' + x + ' 456'), [x]);
	}
});

test('rewrite tracks', t => {
	t.is(
		rewrite('one of my favs http://open.spotify.com/track/6NqSdmfeXJv5JnupGOJ3rX?si=6yLppw_TQqG-5-onueTHbQ asdf'),
		'one of my favs spotify://track/6NqSdmfeXJv5JnupGOJ3rX?si=6yLppw_TQqG-5-onueTHbQ asdf'
	);

	t.is(
		rewrite('one of my favs open.spotify.com/track/6NqSdmfeXJv5JnupGOJ3rX?si=6yLppw_TQqG-5-onueTHbQ asdf'),
		'one of my favs spotify://track/6NqSdmfeXJv5JnupGOJ3rX?si=6yLppw_TQqG-5-onueTHbQ asdf'
	);

	t.is(
		rewrite('one of my favs spotify://track/6NqSdmfeXJv5JnupGOJ3rX?si=6yLppw_TQqG-5-onueTHbQ asdf'),
		'one of my favs spotify://track/6NqSdmfeXJv5JnupGOJ3rX?si=6yLppw_TQqG-5-onueTHbQ asdf'
	);

	t.is(
		rewrite('one of my favs https://open.spotify.com/track/6NqSdmfeXJv5JnupGOJ3rX?si=6yLppw_TQqG-5-onueTHbQ asdf'),
		'one of my favs spotify://track/6NqSdmfeXJv5JnupGOJ3rX?si=6yLppw_TQqG-5-onueTHbQ asdf'
	);

	t.is(
		rewrite('one of my favs spotify:track:6NqSdmfeXJv5JnupGOJ3rX asdf'),
		'one of my favs spotify://track:6NqSdmfeXJv5JnupGOJ3rX asdf'
	);
});

test('rewrite artists', t => {
	const expectedStr = 'check this out spotify://artist/57aX19q7mKEOq5Y6FrHoh2?si=QrFQjcqKR9-BK0XZYUFwrQ adf';
	t.is(
		rewrite('check this out https://open.spotify.com/artist/57aX19q7mKEOq5Y6FrHoh2?si=QrFQjcqKR9-BK0XZYUFwrQ adf'),
		expectedStr
	);

	t.is(
		rewrite('check this out http://open.spotify.com/artist/57aX19q7mKEOq5Y6FrHoh2?si=QrFQjcqKR9-BK0XZYUFwrQ adf'),
		expectedStr
	);

	t.is(
		rewrite(expectedStr),
		expectedStr
	);

	t.is(
		rewrite('check this out open.spotify.com/artist/57aX19q7mKEOq5Y6FrHoh2?si=QrFQjcqKR9-BK0XZYUFwrQ adf'),
		expectedStr
	);

	t.is(
		rewrite('https://open.spotify.com/artist/57aX19q7mKEOq5Y6FrHoh2?si=QrFQjcqKR9-BK0XZYUFwrQ'),
		'spotify://artist/57aX19q7mKEOq5Y6FrHoh2?si=QrFQjcqKR9-BK0XZYUFwrQ'
	);
});

test('rewrite album', t => {
	const expectedStr = 'check this out spotify://album/4xnLZK7GWhsvLgBoeiSWrq?si=4Ks-hvzQSxOnUV7UscYDJA adf';
	t.is(
		rewrite('check this out https://open.spotify.com/album/4xnLZK7GWhsvLgBoeiSWrq?si=4Ks-hvzQSxOnUV7UscYDJA adf'),
		expectedStr
	);

	t.is(
		rewrite('check this out http://open.spotify.com/album/4xnLZK7GWhsvLgBoeiSWrq?si=4Ks-hvzQSxOnUV7UscYDJA adf'),
		expectedStr
	);

	t.is(
		rewrite(expectedStr),
		expectedStr
	);

	t.is(
		rewrite('check this out open.spotify.com/album/4xnLZK7GWhsvLgBoeiSWrq?si=4Ks-hvzQSxOnUV7UscYDJA adf'),
		expectedStr
	);

	t.is(
		rewrite('https://open.spotify.com/album/4xnLZK7GWhsvLgBoeiSWrq?si=4Ks-hvzQSxOnUV7UscYDJA'),
		'spotify://album/4xnLZK7GWhsvLgBoeiSWrq?si=4Ks-hvzQSxOnUV7UscYDJA'
	);

	const expectedStrUri = 'check this out spotify://user:album:4xnLZK7GWhsvLgBoeiSWrq adf';

	t.is(
		rewrite('check this out spotify://user:album:4xnLZK7GWhsvLgBoeiSWrq adf'),
		expectedStrUri
	);

	t.is(
		rewrite('check this out spotify:user:album:4xnLZK7GWhsvLgBoeiSWrq adf'),
		expectedStrUri
	);

	t.is(
		rewrite('check this out spotify:user:album:4xnLZK7GWhsvLgBoeiSWrq adf spotify:user:album:4xnLZK7GWhsvLgBoeiSWrq qrs'),
		expectedStrUri + ' spotify://user:album:4xnLZK7GWhsvLgBoeiSWrq qrs'
	);
});

test('rewrite playlist', t => {
	const expectedStr = 'check this out spotify://user/markcicoria/playlist/2Wz5C4qI9cpOV0xWurixU0?si=nLwS1INsRDKEVI9yh1mgbA adf';
	t.is(
		rewrite('check this out https://open.spotify.com/user/markcicoria/playlist/2Wz5C4qI9cpOV0xWurixU0?si=nLwS1INsRDKEVI9yh1mgbA adf'),
		expectedStr
	);

	t.is(
		rewrite('check this out http://open.spotify.com/user/markcicoria/playlist/2Wz5C4qI9cpOV0xWurixU0?si=nLwS1INsRDKEVI9yh1mgbA adf'),
		expectedStr
	);

	t.is(
		rewrite(expectedStr),
		expectedStr
	);

	t.is(
		rewrite('check this out open.spotify.com/user/markcicoria/playlist/2Wz5C4qI9cpOV0xWurixU0?si=nLwS1INsRDKEVI9yh1mgbA adf'),
		expectedStr
	);

	t.is(
		rewrite('https://open.spotify.com/user/markcicoria/playlist/2Wz5C4qI9cpOV0xWurixU0?si=nLwS1INsRDKEVI9yh1mgbA'),
		'spotify://user/markcicoria/playlist/2Wz5C4qI9cpOV0xWurixU0?si=nLwS1INsRDKEVI9yh1mgbA'
	);

	const expectedStrUri = 'check this out spotify://user:markcicoria:playlist:2Wz5C4qI9cpOV0xWurixU0 adf';

	t.is(
		rewrite('check this out spotify://user:markcicoria:playlist:2Wz5C4qI9cpOV0xWurixU0 adf'),
		expectedStrUri
	);

	t.is(
		rewrite('check this out spotify:user:markcicoria:playlist:2Wz5C4qI9cpOV0xWurixU0 adf'),
		expectedStrUri
	);

	t.is(
		rewrite('check this out spotify:user:markcicoria:playlist:2Wz5C4qI9cpOV0xWurixU0 adf spotify:user:markcicoria:playlist:2Wz5C4qI9cpOV0xWurixU0 qrs'),
		expectedStrUri + ' spotify://user:markcicoria:playlist:2Wz5C4qI9cpOV0xWurixU0 qrs'
	);
});

test('do not rewrite other links', t => {
	const fixtures = [
		'http://foo.com/blah_blah',
		'http://foo.com/blah_blah/',
		'http://foo.com/blah_blah_(wikipedia)',
		'http://foo.com/blah_blah_(wikipedia)_(again)',
		'http://www.example.com/wpstyle/?p=364',
		'https://www.example.com/foo/?bar=baz&inga=42&quux',
		'http://a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.com',
		'http://mw1.google.com/mw-earth-vectordb/kml-samples/gp/seattle/gigapxl/$[level]/r$[y]_c$[x].jpg',
		'http://user:pass@example.com:123/one/two.three?q1=a1&q2=a2#body',
		'http://www.microsoft.xn--comindex-g03d.html.irongeek.com',
		'http://✪df.ws/123',
		'http://localhost/',
		'http://userid:password@example.com:8080',
		'http://userid:password@example.com:8080/',
		'http://userid@example.com',
		'http://userid@example.com/',
		'http://userid@example.com:8080',
		'http://userid@example.com:8080/',
		'http://userid:password@example.com',
		'http://userid:password@example.com/',
		'http://142.42.1.1/',
		'http://142.42.1.1:8080/',
		'http://➡.ws/䨹',
		'http://⌘.ws',
		'http://⌘.ws/',
		'http://foo.com/blah_(wikipedia)#cite-1',
		'http://foo.com/blah_(wikipedia)_blah#cite-1',
		'http://foo.com/unicode_(✪)_in_parens',
		'http://foo.com/(something)?after=parens',
		'http://☺.damowmow.com/',
		'http://code.google.com/events/#&product=browser',
		'http://j.mp',
		'ftp://foo.bar/baz',
		'http://foo.bar/?q=Test%20URL-encoded%20stuff',
		'http://مثال.إختبار',
		'http://例子.测试',
		'http://उदाहरण.परीक्षा',
		'http://-.~_!$&\'()*+\';=:%40:80%2f::::::@example.com',
		'http://1337.net',
		'http://a.b-c.de',
		'http://223.255.255.254',
		'http://example.com?foo=bar',
		'http://example.com#foo',
		'ws://localhost:8080',
		'ws://foo.ws',
		'ws://a.b-c.de',
		'ws://223.255.255.254',
		'ws://userid:password@example.com',
		'ws://➡.ws/䨹',
		'//localhost:8080',
		'//foo.ws',
		'//a.b-c.de',
		'//223.255.255.254',
		'//userid:password@example.com',
		'//➡.ws/䨹',
		'www.google.com/unicorn',
		'http://example.com.'
	];

	for (const x of fixtures) {
		t.is(rewrite(x), x);
	}

	const postText = fixtures.map(f => {
		return f + ' some text after.';
	});

	for (const y of postText) {
		t.is(rewrite(y), y);
	}

	const preText = fixtures.map(f => {
		return 'some text before ' + f;
	});

	for (const z of preText) {
		t.is(rewrite(z), z);
	}
});
