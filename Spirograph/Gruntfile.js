'use strict';

module.exports = function (grunt) {

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
                      { selector: 'head', html: '<link href="application.min.css" rel="stylesheet">' },
                      { selector: 'body', html: '<script src="application.min.js"></script>' }
                    ]
                },
                src: 'index.html',
                dest: '../dist/index.html'
            }
        },

        copy: {
            dist: {
                src: ['fonts/**', 'images/**', 'views/**', 'favicon.ico'],
                dest: '../dist',
                expand: true
            }
        },

        clean: {
            dist: {
                src: ['../dist']
            },
            diststylesheets: {
                src: ['../dist/**/*.css', '../dist/**/*.less', '../dist/**/*.sass', '../dist/**/*.scss', '!../dist/application.min.css']
            },
            distscripts: {
                force: true,
                src: ['../dist/**/*.js', '../dist-temp', '!../dist/application.min.js']
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: '../dist',
                src: ['**/*.html'],
                dest: '../dist/'
            }
        },

        cssmin: {
            dist: {
                src: '../dist/application.css',
                dest: '../dist/application.min.css'
            }
        },

        uglify: {
            dist: {
                src: '../dist-temp/**/*.js',
                dest: '../dist/application.min.js'
            }
        }
    });

    grunt.registerTask(
        'dist',
        'Compiles all of the assets and copies the files to the dist directory',
        ['clean:dist', 'dom_munger:dist', 'copy:dist', 'cssmin', 'uglify', 'htmlmin:dist', 'clean:diststylesheets', 'clean:distscripts']
    );
    grunt.registerTask(
        'default',
        'Creates a deploy-ready build.',
        ['dist']
    );

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-dom-munger');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
};
