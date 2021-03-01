module.exports = [
	[/\/(?!api)(.*)/i, '/index', 'get'],
	[/api\/(.*)/i, '/api', 'get, post'],
];
