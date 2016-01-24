module.exports = function(grunt) {
	require('jit-grunt')(grunt);

	grunt.initConfig({
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					"dist/css/main.css": "src/less/main.less"
				}
			}
		},
		watch: {
			styles: {
				files: ['src/less/**/*.less'],
				tasks: ['less'],
				options: {
					nospawn: true
				}
			}
		}
	});

	grunt.registerTask('default', ['less', 'watch']);
};
