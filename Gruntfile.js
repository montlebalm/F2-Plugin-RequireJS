module.exports = function(grunt) {

	// Project config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		express: {
			server: {
				options: {
					bases: './',
					port: 8080,
					server: (require('path')).resolve('./tests/server')
				}
			}
		},
		jasmine: {
			options: {
				host: 'http://localhost:8080/tests/',
				outfile: 'index.html'
			}
		},
		jshint: {
			options: {
				browser: true,
				curly: true,
				evil: true,
				globals: {
					define: true,
					exports: true,
					require: true,
					module: true,
					F2: true
				},
				latedef: true,
				noarg: true,
				quotmark: 'single',
				shadow: false,
				sub: true,
				undef: true,
				unused: 'vars'
			},
			files: ['Gruntfile.js', 'f2.requirejs.js']
		},
		uglify: {
			dist: {
				files: {
					'f2.requirejs.min.js': ['f2.requirejs.js']
				}
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-express');

	// Register Tasks
	grunt.registerTask('default', ['test', 'js']);
	grunt.registerTask('js', ['jshint', 'uglify:dist']);
	grunt.registerTask('test', ['jshint', 'express', 'jasmine', 'express-keepalive']);
	grunt.registerTask('travis', ['test']);

};