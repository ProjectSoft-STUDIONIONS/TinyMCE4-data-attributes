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
			temp: ['temp']
		},
		requirejs: {},
		uglify: {},
		compress: {},
	});
	grunt.registerTask('default',	[
		"clean",
		"requirejs",
		"uglify",
		"compress"
	]);
}
