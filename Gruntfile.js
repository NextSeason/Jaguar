'use strict'

module.exports = function( grunt ) {
    grunt.initConfig( {
        pkg : grunt.file.readJSON( 'package.json' ),
        host : '',
        staticPath : '/JAGUAR/dist/static',
        //staticPath : '/Jaguar/static',
        dist : 'dist',
        compass : {
            dist : {
                options : {
                    sassDir : 'src/static/scss/',
                    cssDir : '<%= dist %>/static/css/',
                    relativeAssets : false
                }
            }
        },
        copy : {
            project : {
                files : [ {
                    expand : true,
                    cwd : 'src/',
                    src : [ 
                        '**/*.html',
                        'static/images/**/*',
                        'static/js/**/*'
                    ],
                    dest : '<%= dist %>/'
                } ]
            }
        },

        replace : {
            dist : {
                options : {
                    patterns : [ {
                        json : {
                            "path" : {
                                "images" : "<%= staticPath %>/images",
                                "js" : "<%= staticPath %>/js",
                                "css" : "<%= staticPath %>/css"
                            }
                        }
                    } ]
                },
                files : [ {
                    expand : true,
                    src : [
                        '<%= dist %>/**/*.html',
                        '<%= dist %>/**/*.css',
                        '<%= dist %>/**/*.js'
                    ]
                } ]
            }
        },
        watch : {
            project : {
                files : [ 'src/**/*' ],
                tasks : [ 'copy', 'compass', 'replace' ]
            }
        },
        uglify : {
            target : {
                files : [ {
                    expand : true,
                    src : '<%= dist %>/**/*.js'
                } ]
            }
        },
        cssmin : {
            target : {
                files : [ {
                    expand : true,
                    src : [ '<%= dist %>/**/*.css' ]
                } ]
            }
        }
        /*
        environments : {
            options : {
            }
        }
        */
    } );

    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-compass' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-replace' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );

    grunt.registerTask( 'remove', function() {
        grunt.file.delete( './dist', { force : true } );
    } );

    grunt.registerTask( 'default', [ 'remove', 'copy', 'compass', 'replace' ] );

    grunt.registerTask( 'online', [ 'default', 'uglify', 'cssmin' ] );
};
