const start = Date.now();
const nunjucks = require('nunjucks');
const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');

nunjucks.configure('src', { autoescape: true });

glob('src/pages/**/*.njk', (err, files) => {
	const io = [];
	files.forEach(async (file) => {
		const context = await fs.readJson(path.dirname(path.relative(process.cwd(), file)) + '/context.json');
		const html = nunjucks.render(path.relative('src', file), context);
		const dest = path.join('dist', path.relative('src/pages', file).replace('.njk', '.html'));
		io.push(fs.outputFile(dest, html, { encoding: 'utf8' }));
	});
	Promise.all(io).then(() => {
		console.log(`Finished in ${Date.now() - start}ms`);
	});
});