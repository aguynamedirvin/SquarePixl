module.exports = function(grunt) {
    grunt.initConfig({

        // Watch our files for changes
        watch: {
            grunt: { 
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },

            sass: {
                files: ['src/stylesheets/**/*.sass', 'src/stylesheets/**/*.scss'],
                tasks: ['sass']
            },

            uglify: {
                files: ['src/js/*.js'],
                tasks: ['uglify']
            }
        },


        // SASS
        sass: {
            options: {
                outputStyle: 'expanded',
                includePaths: ['bower_components/bourbon/app/assets/stylesheets']
            },
            default: {
                files: {
                    'assets/css/main.css': 'src/stylesheets/main.sass'
                }
            }
        },


        // Uglify - JavaScript Combiner / Compresser 
        uglify: {
            default: {
                options: {
                    mangle: false,
                    screwIE8: true,
                    beautify: {
                        width: 50,
                        beautify: true
                    }
                },
                files: {

                    // Main
                    'assets/js/main.min.js': ['src/js/navigation.js', 'src/js/smoothscroll.js', 'src/js/svg4everybody.js', 'src/js/vivus.js'],

                    // For mobile
                    'assets/js/mobile.min.js': ['src/js/fastclick.js'],

                    // Polyfills/Fixes
                    'assets/js/respond.min.js': 'src/js/respond.js',
                    'assets/js/svg4everybody.min.js': 'src/js/svg4everybody.js',

                    // Vendor
                    'assets/js/vendor/modernizr.min.js': 'src/js/vendor/modernizr.js',
                    
                }
            },
            // Uglify - Production
            build: {
                options: {
                    screwIE8: true
                },
                files: ['<%= uglify.default.files %>']
            }
        },


        // SVG STORE - Crate SVG Sprite
        svgstore: {
            options: {
                cleanup: true,
                inheritviewbox: true,
                svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
                    xmlns: 'http://www.w3.org/2000/svg'
                }
            },
            default: {
                files: {
                    'assets/images/svg-sprite.svg': ['src/svg/*.svg']
                }
            },
        },


        // Combine Media Queries
        cmq: {
            default: {
                files: {
                    'assets/css/main.css': ['assets/css/main.css']
                }
            }
        },


        // Add Fallback units for older browsers
        postcss: {
            options: {
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    //require('autoprefixer')({browsers: ['last 2 versions', 'ie 8', 'ie 9', 'Android 2.3']}), // add vendor prefixes
                    //require('cssnano')(), // minify the result
                ]
            },
            default: {
                src: 'assets/css/main.css'
            }
        },


        // Minify Our CSS
        cssmin: {
            default: {
                files: [{
                    expand: true,
                    cwd: 'assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'assets/css',
                    ext: '.min.css'
                }]
                /*files: {
                    'assets/css/main.css': ['assets/css/main.css']
                }*/
            },
        },

    });





// Tasks
grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-svgstore');
grunt.loadNpmTasks('grunt-combine-media-queries');
grunt.loadNpmTasks('grunt-postcss');
grunt.loadNpmTasks('grunt-contrib-cssmin');


// Quick Compilation - Build Our SASS
grunt.registerTask('build', ['sass']);

// Developement - Watch & Build Our SASS Files
grunt.registerTask('default', ['build', 'watch']);

// Production - Build the files for production use
grunt.registerTask('production', ['build', 'uglify:build', 'svgstore', 'cmq', 'postcss', 'cssmin']);

};