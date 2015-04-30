// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';


module.exports = function (grunt) {
    // Load grunt tasks automatically
    //require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },

        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },
        //watch: {
        //    options: {
        //        nospawn: true,
        //        livereload: true
        //    },
        //    js: {
        //        files: ['{.tmp,<%%= yeoman.app %>}/scripts/{,*/}*.js'],
        //        tasks: ['newer:jshint:all']
        //    },
        //    jsTest: {
        //        files: ['test/spec/{,*/}*.js'],
        //        tasks: ['newer:jshint:test', 'karma']
        //    },
        //    //<% if (compass) { %>
        //    compass: {
        //        files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        //        tasks: ['compass:server', 'autoprefixer']
        //    },
        //    // <% } else { %>
        //    styles: {
        //        files: ['<%%= yeoman.app %>/styles/{,*/}*.css'],
        //        tasks: ['newer:copy:styles', 'autoprefixer']
        //    },
        //    // <% } %>
        //    gruntfile: {
        //        files: ['Gruntfile.js']
        //    },
        //    livereload: {
        //        options: {
        //            livereload: true
        //        },
        //        files: [
        //            '<%%= yeoman.app %>/{,*/}*.html',
        //            '.tmp/styles/{,*/}*.css',
        //            '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        //        ]
        //    }
        //},

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%%= yeoman.dist %>/*',
                            '!<%%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp',
            //components: '<%%= yeoman.dist %>/bower_components'
        },

        //<% if (compass) { %>
        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%%= yeoman.app %>/images',
                javascriptsDir: '<%%= yeoman.app %>/scripts',
                fontsDir: '<%%= yeoman.app %>/styles/fonts',
                importPath: '<%%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            //return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            //'clean:server',
            'nodemon',
            'watch'
        ]);
    });

    grunt.registerTask('test', function (target) {

    });

    grunt.registerTask('build', [

    ]);

    grunt.registerTask('default', [

    ]);
};