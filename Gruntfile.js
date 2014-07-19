'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        dom_munger: {
            dist: {
                options: {
                    read: [
                      { selector: 'link', attribute: 'href', writeto: 'cssRefs', isPath: true },
                      { selector: 'script:not(.ignored)', attribute: 'src', writeto: 'jsRefs', isPath: true },
                      { selector: 'link', attribute: 'href', writeto: 'cssRefsWithoutPath', isPath: false },
                      { selector: 'script:not(.ignored)', attribute: 'src', writeto: 'jsRefsWithoutPath', isPath: false }
                    ],
                    remove: ['link', 'script'],
                    append: [
                      { selector: 'head', html: '<link href="application.min.css" rel="stylesheet" />' },
                      { selector: 'head', html: '<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />' },
                      { selector: 'body', html: '<script src="bower_components/d3/d3.min.js"></script>' },
                      { selector: 'body', html: '<script src="application.min.js"></script>' }
                    ]
                },
                src: 'app/index.html',
                dest: 'dist/index.html'
            },
            devbuild: {
                options: {
                    read: [
                      { selector: 'link', attribute: 'href', writeto: 'cssRefs', isPath: true },
                      { selector: 'script', attribute: 'src', writeto: 'jsRefs', isPath: true },
                      { selector: 'link', attribute: 'href', writeto: 'cssRefsWithoutPath', isPath: false },
                      { selector: 'script', attribute: 'src', writeto: 'jsRefsWithoutPath', isPath: false }
                    ],
                    remove: ['link'],
                    append: [
                      { selector: 'head', html: '<link href="application.css" rel="stylesheet" />' },
                      { selector: 'head', html: '<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />' }
                    ]
                },
                src: 'app/index.html',
                dest: 'devbuild/index.html'
            }
        },

        copy: {
            dist: {
                cwd: 'app',
                src: ['fonts/**', 'images/**', 'views/**', 'favicon.ico', 'bower_components/d3/d3.min.js'],
                dest: 'dist',
                expand: true
            },
            devbuild: {
                cwd: 'app',
                src: ['<%= dom_munger.data.jsRefsWithoutPath %>', '<%= dom_munger.data.cssRefsWithoutPath %>', 'fonts/**', 'images/**', 'views/**', 'favicon.ico'],
                dest: 'devbuild',
                expand: true
            },
            fonts: {
                cwd: 'app',
                src: ['fonts/**'],
                dest: 'devbuild',
                expand: true
            },
            images: {
                cwd: 'app',
                src: ['images/**'],
                dest: 'devbuild',
                expand: true
            }
        },

        clean: {
            dist: {
                src: ['dist']
            },
            devbuild: {
                src: ['devbuild']
            },
            devstylesheets: {
                src: ['devbuild/**/*.css', 'devbuild/**/*.less', 'devbuild/**/*.sass', 'devbuild/**/*.scss', '!devbuild/application.css']
            },
            diststylesheets: {
                src: ['dist/**/*.css', 'dist/**/*.less', 'dist/**/*.sass', 'dist/**/*.scss', '!dist/application.min.css']
            },
            distscripts: {
                force: true,
                src: ['dist/**/*.js', 'dist-temp', '!dist/application.min.js', '!dist/**/d3.min.js']
            },
            test: {
                force: true,
                src: ['test-temp']
            }
        },

        less: {
            dist: {
                files: {
                    'dist/application.css': 'app/styles/application.less'
                }
            },
            devbuild: {
                files: {
                    'devbuild/application.css': 'app/styles/application.less'
                }
            }
        },

        autoprefixer: {
            dist: {
                cwd: 'dist',
                src: ['application.css'],
                dest: 'dist',
                expand: true
            },
            devbuild: {
                cwd: 'devbuild',
                src: ['application.css'],
                dest: 'devbuild',
                expand: true
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: 'dist',
                src: ['**/*.html'],
                dest: 'dist/'
            }
        },

        cssmin: {
            dist: {
                src: 'dist/application.css',
                dest: 'dist/application.min.css'
            }
        },

        uglify: {
            dist: {
                src: 'dist-temp/**/*.js',
                dest: 'dist/application.min.js'
            }
        },

        watch: {
            options: {
                livereload: true
            },
            dist: {
                files: ['app/**'],
                tasks: ['dist']
            },
            devbuild: {
                files: ['app/**/*.{html,htm,md,js,ts,json,css,less,sass,scss,png,jpg,jpeg,gif,ico,webp,svg,woff,ttf,eot}', '!app/bower_components/**'],
                tasks: ['dom_munger', 'less:devbuild', 'autoprefixer:devbuild', 'copy:fonts', 'copy:images', 'copy:devbuild', 'ts:devbuild']
            }
        },

        connect: {
            devbuild: {
                options: {
                    port: 4000,
                    livereload: true,
                    open: true,
                    base: 'devbuild/',
                    hostname: 'localhost'
                }
            },
            dist: {
                options: {
                    port: 4000,
                    livereload: true,
                    open: true,
                    base: 'dist/',
                    hostname: 'localhost'
                }
            }
        },

        karma: {
            unit: {
                options: {
                    files: [
                        'app/bower_components/angular/angular.js',
                        'app/bower_components/angular-mocks/angular-mocks.js',
                        'test-temp/app/scripts/modules.js',
                        'test-temp/**/*.js'
                    ],
                    frameworks: ['jasmine'],
                    reporters: ['progress'],
                    color: true,
                    browsers: ['PhantomJS'],
                    singleRun: true
                }
            }
        },

        ts: {
            devbuild: {
                src: ['app/scripts/**/*.ts', '!app/scripts/definitions/**/*.ts'],
                outDir: 'devbuild/scripts'
            },
            test: {
                src: ['app/scripts/**/*.ts', 'test/**/*.ts', '!app/scripts/definitions/**/*.ts'],
                outDir: 'test-temp/'
            },
            dist: {
                src: ['app/scripts/**/*.ts', '!app/scripts/definitions/**/*.ts'],
                outDir: 'dist-temp/'
            }
        }
    });

    grunt.registerTask(
            'test',
            'Runs all the unit tests for this project',
            ['ts:test', 'karma', 'clean:test']
        );

    grunt.registerTask(
        'dist',
        'Compiles all of the assets and copies the files to the dist directory',
        ['clean:dist', 'dom_munger:dist', 'copy:dist', 'less:dist', 'autoprefixer:dist', 'cssmin', 'test', 'ts:dist', 'uglify', 'htmlmin:dist', 'clean:diststylesheets', 'clean:distscripts']
    );

    grunt.registerTask(
        'devbuild',
        'Compiles all of the assets and copies the files to the devbuild directory',
        ['clean:devbuild', 'dom_munger:devbuild', 'copy:devbuild', 'ts:devbuild', 'less:devbuild', 'autoprefixer:devbuild', 'clean:devstylesheets']
    );

    grunt.registerTask(
        'servedist',
        'Watches the project for changes, automatically builds them and runs a server',
        ['connect:dist', 'watch:dist']
    );

    grunt.registerTask(
        'servedev',
        'Watches the project for changes, automatically creates a development build and serves the build',
        ['connect:devbuild', 'watch:devbuild']
    );

    grunt.registerTask(
        'default',
        'Builds a development build, and begins serving from the directory',
        ['devbuild', 'servedev']
    );

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-dom-munger');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
};
