// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';


module.exports = function (grunt) {
    // Load grunt tasks automatically
    //require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-open');

    // Define the configuration for all the tasks
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },

        nodemon: {
            dev: {
                script: 'server/server.js'
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            server: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: [
                    'server/**/*.js',
                    '!server/**/*.spec.js'
                ]
            },
            all: [
                '<%%= yeoman.app %>/**/*.js'
            ]
        },

        express: {
            options: {
                port: process.env.PORT || 3010
            },
            dev: {
                options: {
                    script: 'server/server.js',
                    debug: true
                }
            },
            prod: {
                options: {
                    script: 'dist/server/server.js'
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            scripts: {
                files: ['app/**/*.js'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            sassWidget: {
                files: [
                    '<%= yeoman.app %>/widget/style/sass/{,*/}*.{scss,sass}',
                    '<%= yeoman.app %>/widget/**/*.js'],
                tasks: ['compass:devWidget']
            },
            sassSettings: {
                files: [
                    '<%= yeoman.app %>/settings/style/sass/{,*/}*.{scss,sass}',
                    '<%= yeoman.app %>/settings/**/*.js', '<%= yeoman.app %>/core/**/*.js'],
                tasks: ['compass:devSettings']
            }
        },

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
            server: '.tmp'
            //components: '<%%= yeoman.dist %>/bower_components'
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:devWidget', 'compass:devSettings'
            ],
            dist: [
                'compass:distWidget', 'compass:distSettings'
            ]
        },

        //<% if (filters.add_sass) { %>
        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            distWidget: {
                options: {
                    sassDir: '<%= yeoman.app %>/widget/style/sass',
                    cssDir: '<%= yeoman.app %>/widget/style/stylesheets',
                    environment: 'production'
                }
            },
            distSettings: {
                options: {
                    sassDir: '<%= yeoman.client %>/app/settings/style/sass',
                    cssDir: '<%= yeoman.client %>/app/settings/style/stylesheets',
                    environment: 'production'
                }
            },
            devWidget: {
                options: {
                    sassDir: '<%= yeoman.app %>/widget/style/sass',
                    cssDir: '<%= yeoman.app %>/widget/style/stylesheets'
                }
            },
            devSettings: {
                options: {
                    sassDir: '<%= yeoman.app %>/settings/style/sass',
                    cssDir: '<%= yeoman.app %>/settings/style/stylesheets'
                }
            }
        },
        // <% } %>

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

    // Used for delaying livereload until after server has restarted
    grunt.registerTask('wait', function () {
        grunt.log.ok('Waiting for server reload...');

        var done = this.async();

        setTimeout(function () {
            grunt.log.writeln('Done waiting!');
            done();
        }, 1500);
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            //return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            //'clean:server',
            //'concurrent:server',
            'jshint',
            'express:dev',
            'wait',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('build', [

    ]);
};