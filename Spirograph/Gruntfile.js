module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        dom_munger: {
            dist: {
                options: {
                    read: [
                      { selector: 'link:not(.dom_munger-ignore)', attribute: 'href', writeto: 'cssRefs', isPath: true },
                      { selector: 'script:not(.dom_munger-ignore)', attribute: 'src', writeto: 'jsRefs', isPath: true },
                      { selector: 'link:not(.dom_munger-ignore)', attribute: 'href', writeto: 'cssRefsWithoutPath', isPath: false },
                      { selector: 'script:not(.dom_munger-ignore)', attribute: 'src', writeto: 'jsRefsWithoutPath', isPath: false }
                    ],
                    remove: ['link:not(.dom_munger-ignore)', 'script:not(.dom_munger-ignore)'],
                    append: [
                      { selector: 'head', html: '<link href="app.min.css" rel="stylesheet">' },
                      { selector: 'body', html: '<script src="app.min.js"></script>' }
                    ]
                },
                cwd: '.',
                src: 'index.html',
                dest: '../dist/index.html'
            }
        },

        copy: {
            favicon: {
                cwd: '.',
                src: ['favicon.ico'],
                dest: '../dist/',
                expand: false
            },
            css: {
                cwd: '.',
                src: ['styles/app.min.css'],
                dest: '../dist/app.min.css',
                expand: false
            },
            scripts: {
                cwd: '.',
                src: ['scripts/**'],
                dest: '../dist/',
                expand: true
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/fontawesome/fonts/**'],
                        dest: '../dist/',
                        filter: 'isFile'
                    }
                ]
            },
            server: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['server/**'],
                        dest: '../dist/',
                        filter: 'isFile'
                    }
                ]
            }
        },

        clean: {
            options: {
                force: true
            },
            cwd: '.',
            everything: {
                force: true,
                src: ['../dist']
            },
            dist: {
                force: true,
                src: ['../dist/scripts']
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: '.',
                src: ['../dist/index.html'],
                dest: '../dist/'
            }
        },

        uglify: {
            dist: {
                cwd: '.',
                src: '<%= dom_munger.data.jsRefsWithoutPath %>',
                dest: '../dist/app.min.js'
            }
        }
    });

    grunt.registerTask(
        'dist',
        'Compiles all of the assets and copies the files to the dist directory',
        ['clean:everything', 'dom_munger:dist', 'copy:favicon', 'copy:css', 'copy:scripts', 'copy:fonts', 'copy:server', 'uglify', 'htmlmin:dist', 'clean:dist']
    );
    grunt.registerTask(
        'default',
        'Creates a deploy-ready build.',
        ['dist']
    );

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-dom-munger');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
};
