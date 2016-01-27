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
				files: {
					"src/css/main.css": "src/less/main.less"
				}
			}
		},
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            main: {
                expand: true,
                flatten: true,
                src: 'src/css/main.css',
                dest: 'dist/'
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css/',
                    src: 'main.css',
                    dest: 'dist/css/',
                    ext: '.min.css'
                }]
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
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.html',
                    dest: 'dist/'
                }]
            }
        },
		watch: {
			styles: {
				files: ['src/less/**/*.less'],
				tasks: ['less', 'autoprefixer', 'cssmin'],
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
                files: ['src/**/*.html'],
                tasks: ['htmlmin'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
		}
	});

	grunt.registerTask('default', ['less', 'autoprefixer', 'cssmin', 'concat', 'uglify', 'newer:imagemin', 'htmlmin', 'connect', 'watch']);
};
