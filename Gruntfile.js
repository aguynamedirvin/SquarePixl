module.exports = function(grunt) {
	grunt.initConfig({

		// Watch
		watch: {
			grunt: { files: ['Gruntfile.js'] },

			sass: {
				files: ['src/stylesheets/**/*.sass', 'src/stylesheets/**/*.scss'],
				tasks: ['sass']
			},

			uglify: {
				files: ['src/js/*.js'],
				task: ['uglify']
			}
		},

		// SASS
		sass: {
			options: {
				includePaths: [
					'bower_components/bourbon/app/assets/stylesheets'
				]
			},
			dist: {
				options: {
						outputStyle: 'expanded'
				},
				files: {
					'assets/css/main.css': 'src/stylesheets/main.sass'
				}
			}
		},


    	// Uglify
    	uglify: {
			build: {
				/*options: {
					beautify: {
						width: 80,
						beautify: true
					}
				},*/
				files: {

					// Main
					'assets/js/main.min.js': ['src/js/svg4everybody.js'],


					// For mobile
					'assets/js/mobile.min.js': ['src/js/fastclick.js'],

					// Polyfills/Fixes
					'assets/js/respond.min.js': 'src/js/respond.js',
					'assets/js/svg4everybody.ie.min.js': 'src/js/svg4everybody.ie.js',
					'assets/js/svg4everybody.min.js': 'src/js/svg4everybody.js',

					// Vendor
					'assets/js/vendor/modernizr.min.js': 'src/js/vendor/modernizr.js'
				}
			}
		},

		// SVG STORE
		svgstore: {
			options: {
				prefix : 'icon-', // This will prefix each ID
				svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
					viewBox : '0 0 100 100',
					xmlns: 'http://www.w3.org/2000/svg'
				}
			},
			default: {
				files: {
					'assets/images/svg-sprite.svg': ['src/svg/*.svg']
				}
			},
		},


		postcss: {
			options: {
				processors: [
					require('pixrem')(), // add fallbacks for rem units
					require('autoprefixer')({browsers: ['last 2 versions', 'ie 8', 'ie 9', 'Android 2.3']}), // add vendor prefixes
					require('cssnano')(), // minify the result
				]
			},
			dist: {
				src: 'assets/css/main.css'
			}
		},

		cssmin: {
		// the combine task
			combine: {
				files: {
					'assets/css/main.css': ['src/css/normalize.css', 'assets/css/main.css']
				}
			},
			/*minify: {
				files: {
					'cleaned/css/app-cleaned.min.css': ['cleaned/css/app-cleaned.css']
				}
			}*/
		},
		
	});





// Tasks
grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-svgstore');
grunt.loadNpmTasks('grunt-postcss');
grunt.loadNpmTasks('grunt-contrib-cssmin');


// Build Our SASS
grunt.registerTask('build', ['sass']);

// Watch Our SASS Files
grunt.registerTask('default', ['build', 'watch']);

// Ready For Production
grunt.registerTask('production', ['build', 'uglify', 'svgstore', 'cssmin', 'postcss']);

};