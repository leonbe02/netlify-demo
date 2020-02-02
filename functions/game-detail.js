const generateHTML = (slug) => {
	return `
		<!doctype html>
		<html>
			<head>
				<meta charset="utf8">
				<title>Nintendo - ${slug}</title>
			</head>
			<body>
				<h1>${slug}</h1>
			</body>
		</html>
	`.trim();
};

exports.handler = async function(event, context) {
	return {
		statusCode: 200,
		body: generateHTML(event.path),
		headers: {
			'Content-Type': 'text/html',
			'Cache-Control': 'max-age=900, public'
		}
	};
};