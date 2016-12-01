module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        'pkg': grunt.file.readJSON('package.json'),

        'jshint': {
            'beforeconcat': ['app/**/*.js'],
        },
        'concat': {
            'dist': {
                'src': ['app/**/*.js'],
                'dest': 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        'uglify': {
            'options': {
                'mangle': false,
            },
            'dist': {
                'files': {
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
            'connect'
        ]);
};
