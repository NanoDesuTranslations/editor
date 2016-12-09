module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        'pkg': grunt.file.readJSON('package.json'),

        'jshint': {
            'beforeconcat': ['app/**/*.js'],
        },
        'copy': {
            'dist': {
                'files': [
                    // copy index.html
                    {'expand': true, 'src': ['index.html'], 'dest': 'dist/', 'filter': 'isFile'},
                    // copy html template in views
                    {'expand': true, 'src': ['views/*'], 'dest': 'dist/'}
                ]
            }
        },
        'concat': {
            'dist': {
                'src': ['app/**/*.js'],
                'dest': 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        'cssmin': {
            'dist': {
                'files': []
            }
        },
        'uglify': {
            'options': {
                'mangle': false,
            },
            'dist': {
                'files': {
                    // minify from concatenation js
                    'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.name %>-<%= pkg.version %>.js']
                }
            }
        },
        'connect': {
            'server': {
                'options': {
                    'port': 9000,
                    'open': true,
                    'keepalive': true
                }
            }
        }
    });

    grunt.registerTask('build',
        [
            'jshint',
            'concat',
            'uglify',
            //'connect',
            'copy'
        ]);
};
