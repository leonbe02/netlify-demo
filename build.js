const start = Date.now();
const nunjucks = require('nunjucks');
const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');

nunjucks.configure('.', { autoescape: true });

fs.ensureDirSync('dist');
fs.copyFileSync('_redirects', 'dist/_redirects');
fs.copy('templates', 'functions/game-detail/templates');

glob('pages/**/*.njk', (err, files) => {
	const io = [];
	files.forEach(async (file) => {
		const context = await fs.readJson(path.dirname(path.relative(process.cwd(), file)) + '/context.json');
		const html = nunjucks.render(path.relative('.', file), context);
		const dest = path.join('dist', path.relative('pages', file)).replace('.njk', '.html');
		io.push(fs.outputFile(dest, html, { encoding: 'utf8' }));
	});
	Promise.all(io).then(() => {
		console.log(`Finished in ${Date.now() - start}ms`);
	});
});