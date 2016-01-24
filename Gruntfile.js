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
        concat: {
            dist: {
                src: ['src/js/main.js'],
                dest: 'dist/js/main.js'
            }
        },
		watch: {
			styles: {
				files: ['src/less/**/*.less'],
				tasks: ['less'],
				options: {
					nospawn: true
				}
			},
            scripts: {
                files: ['src/js/**/*.js'],
                tasks: ['concat']
            }
		}
	});

	grunt.registerTask('default', ['less', 'concat', 'watch']);
};
