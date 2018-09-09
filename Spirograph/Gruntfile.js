module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        dom_munger: {
            main: {
                options: {
                    read: [
                      { selector: 'link:not(.dom_munger-ignore)', attribute: 'href', writeto: 'mainCssRefs', isPath: true },
                      { selector: 'script:not(.dom_munger-ignore)', attribute: 'src', writeto: 'mainJsRefs', isPath: true },
                      { selector: 'link:not(.dom_munger-ignore)', attribute: 'href', writeto: 'mainCssRefsWithoutPath', isPath: true },
                      { selector: 'script:not(.dom_munger-ignore)', attribute: 'src', writeto: 'mainJsRefsWithoutPath', isPath: true }
                    ],
                    remove: [
                        'link:not(.dom_munger-ignore)',
                        'script:not(.dom_munger-ignore)',
                        '.dom_munger-remove'
                    ],
                    append: [
                      { selector: 'head', html: '<link href="app.min.css" rel="stylesheet">' },
                      { selector: 'body', html: '<script src="app.min.js"></script>' }
                    ]
                },
                cwd: '.',
                src: 'index.html',
                dest: '../dist/index.html'
            },
            gallery: {
                options: {
                    read: [
                      { selector: 'link:not(.dom_munger-ignore)', attribute: 'href', writeto: 'galleryCssRefs', isPath: true },
                      { selector: 'script:not(.dom_munger-ignore)', attribute: 'src', writeto: 'galleryJsRefs', isPath: true },
                      { selector: 'link:not(.dom_munger-ignore)', attribute: 'href', writeto: 'galleryCssRefsWithoutPath', isPath: true },
                      { selector: 'script:not(.dom_munger-ignore)', attribute: 'src', writeto: 'galleryJsRefsWithoutPath', isPath: true }
                    ],
                    remove: [
                        'link:not(.dom_munger-ignore)',
                        'script:not(.dom_munger-ignore)',
                        '.dom_munger-remove'
                    ],
                    append: [
                      { selector: 'head', html: '<link href="styles/app.min.css" rel="stylesheet">' },
                      { selector: 'body', html: '<script src="app.min.js"></script>' }
                    ]
                },
                cwd: '.',
                src: './gallery/index.html',
                dest: '../dist/gallery/index.html'
            }
        },

        copy: {
            favicon: {
                cwd: '.',
                src: ['favicon.ico'],
                dest: '../dist/',
                expand: false
            },
            mainCss: {
                cwd: '.',
                src: ['styles/app.min.css'],
                dest: '../dist/app.min.css',
                expand: false
            },
            galleryCss: {
                cwd: '.',
                src: ['gallery/styles/app.min.css'],
                dest: '../dist/gallery/styles/app.min.css',
                expand: false
            },
            mainScripts: {
                cwd: '.',
                src: ['scripts/**'],
                dest: '../dist/',
                expand: true
            },
            galleryScripts: {
                cwd: '.',
                src: ['gallery/scripts/**'],
                dest: '../dist/',
                expand: true
            },
            galleryImages: {
                cwd: '.',
                src: ['gallery/images/**'],
                dest: '../dist/',
                expand: true
            },
            mainFonts: {
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
            galleryFonts: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['gallery/bower_components/fontawesome/fonts/**'],
                        dest: '../dist/gallery',
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
            },
            mainMisc: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['old-browser.html', 'link-thumbnail.png', 'download.html'],
                        dest: '../dist/',
                        filter: 'isFile'
                    }
                ]
            },
            galleryMisc: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['gallery/deleted.png', 'gallery/old-browser.html'],
                        dest: '../dist/gallery/',
                        filter: 'isFile'
                    }
                ]
            },
            packageJson: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['package.json'],
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
                src: ['../dist/scripts', '../dist/gallery/scripts']
            }
        },

        htmlmin: {
            main: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: '.',
                src: ['../dist/index.html'],
                dest: '../dist/'
            },
            gallery: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: '.',
                src: ['../dist/gallery/index.html'],
                dest: '../dist/'
            }
        },

        uglify: {
            main: {
                cwd: '.',
                src: '<%= dom_munger.data.mainJsRefsWithoutPath %>',
                dest: '../dist/app.min.js'
            },
            gallery: {
                cwd: '.',
                src: '<%= dom_munger.data.galleryJsRefs %>',
                dest: '../dist/gallery/app.min.js'
            }
        },

        fontAwesomeVars: {
            main: {
                variablesLessPath: 'bower_components/fontawesome/less/variables.less',
                fontPath: './'
            },
            gallery: {
                variablesLessPath: 'gallery/bower_components/fontawesome/less/variables.less',
                fontPath: './'
            }
        }
    });

    grunt.registerTask(
        'dist',
        'Compiles all of the assets and copies the files to the dist directory',
        ['clean:everything', /*'fontAwesomeVars:main', 'fontAwesomeVars:gallery',*/ 'dom_munger:main', 'dom_munger:gallery', 'copy:favicon', 'copy:mainCss', 'copy:galleryCss', 'copy:mainScripts',
            'copy:galleryScripts', 'copy:galleryImages', 'copy:galleryFonts', 'copy:mainFonts', 'copy:server', 'copy:mainMisc', 'copy:galleryMisc', 'copy:packageJson', 'uglify:main', 'uglify:gallery', 'htmlmin:main', 'htmlmin:gallery', 'clean:dist']
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
    grunt.loadNpmTasks('grunt-font-awesome-vars');
};
