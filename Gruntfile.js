module.exports = function(grunt) {
	require('time-grunt')(grunt);

	const fs = require('fs'),
		chalk = require('chalk'),
		PACK = grunt.file.readJSON('package.json'),
		update = grunt.template.today("yyyy-mm-dd'T'HH-MM-ss").replace(/[- ]+/gi, '');
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		globalConfig : {},
		pkg : {},
		clean: {
			zip: ['*.zip'],
			temp: ['temp'],
		},
		requirejs: {
			main: {
				options: {
					baseUrl: "src/js/",
					out: "plugins/dataattributes/plugin.js",
					paths: {},
					wrap: true,
					skipModuleInsertion: true,
					optimize: "none",
					include: [
						"plugin.js",
					],
					done: function(done, output) {
						grunt.log.writeln(output.magenta);
						grunt.log.writeln("Build ".cyan + "done!\n");
						done();
					},
					error: function(done, err) {
						grunt.log.warn(err);
						done();
					},
				},
			},
		},
		uglify: {
			options: {
				sourceMap: false,
				banner: ``,
				compress: {
					drop_console: false
				},
				output: {
					ascii_only: true
				},
			},
			main: {
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							"plugins/dataattributes/plugin.js"
						],
						dest: "plugins/dataattributes",
						filter: "isFile",
						rename: function (dst, src) {
							return dst + "/" + src.replace(".js", ".min.js");
						}
					},
				],
			},
		},
		compress: {
			main: {
				options: {
					archive: `dataattributes.zip`,
				},
				files: [
					{
						src: [
							'plugins/**',
						],
						dest: `tinymce/`,
					},
				],
			},
			evo4: {
				options: {
					archive: `dataattributes-evo4.zip`,
				},
				files: [
					{
						src: [
							'plugins/**',
						],
						dest: `dataattributes/assets/plugins/tinymce4/tinymce/`,
					},
				],
			}
		},
	});
	grunt.registerTask('default',	[
		"clean",
		"requirejs",
		"uglify",
		"compress",
	]);
}
