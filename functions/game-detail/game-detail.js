const nunjucks = require('nunjucks');

nunjucks.configure('.', { autoescape: true });
	
exports.handler = async function(event, context) {
	const html = nunjucks.render('templates/games/detail.njk', {
		"meta": {
			"title": "Nintendo - GDP",
			"description": "Nintendo - GDP"
		},
		"pageTitle": event.path
	});

	return {
		statusCode: 200,
		body: html,
		headers: {
			'Content-Type': 'text/html',
			'Cache-Control': 'max-age=900, public'
		}
	};
};