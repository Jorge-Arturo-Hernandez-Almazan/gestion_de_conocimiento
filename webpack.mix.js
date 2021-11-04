let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */
// setting the public directory to public (this is where the mix-manifest.json gets created)
mix.setPublicPath('public')

.scripts(
	'public/adminlte/js/jquery.min.js',
	'public/adminlte/js/bootstrap.bundle.min.js',
	'public/adminlte/js/adminlte.min.js',
	'public/js/principal.js')
.js(
    'resources/assets/js/main.js'
    ,'public/js/main.js')

.styles([
	'public/adminlte/css/adminlte/adminlte.min.css',
	//'public/adminlte/css/all.min.css'
],'public/css/main.css');

mix.webpackConfig({
    resolve: {
        alias: {
            "@": path.resolve(
                __dirname,
                "resources/assets/js"
            ),
            "@sass": path.resolve(
                __dirname,
                "resources/assets/sass"
            ),
						"@public": path.resolve(
                __dirname,
                "public/arbol"
            ),
        }
    }
 });
