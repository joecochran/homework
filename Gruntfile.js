module.exports = function(grunt) {
    require('jit-grunt')(grunt);
    
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'dist',
                    livereload: true
                }
            }
        },
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
                src: [
                    'node_modules/jquery/dist/jquery.js',
                    'node_modules/knockout/build/output/knockout-latest.js',
                    'node_modules/knockout.mapping/knockout.mapping.js',
                    'src/js/main.js'
                ],
                dest: 'dist/js/app.js'
            }
        },
        uglify: {
            build: {
                src: 'dist/js/app.js',
                dest: 'dist/js/app.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: '**/*.{png,jpg,gif}',
                    dest: 'dist/img/'
                }]
            }
        },
		watch: {
			styles: {
				files: ['src/less/**/*.less'],
				tasks: ['less'],
				options: {
					spawn: false,
                    livereload: true
				}
			},
            scripts: {
                files: ['src/js/**/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            images: {
                files: ['**/*{png,jpg,gif}'],
                tasks: ['newer:imagemin'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            html: {
                files: ['dist/**/*.html'],
                options: {
                    livereload: true
                }
            }
		}
	});

	grunt.registerTask('default', ['less', 'concat', 'uglify', 'newer:imagemin', 'connect', 'watch']);
};
