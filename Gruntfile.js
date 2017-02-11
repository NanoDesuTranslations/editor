module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.initConfig({
        'pkg': grunt.file.readJSON('package.json'),

        'jshint': {
            'beforeconcat': ['app/**/*.js'],
        },
        'copy': {
            'public': {
                'files': [
                    // copy index.html
                    {'expand': true, 'src': ['index.html'], 'dest': 'public/', 'filter': 'isFile'},
                    // copy html template in views
                    {'expand': true, 'src': ['views/**'], 'dest': 'public/'},
                    {'expand': true, 'src': ['assets/js/*'], 'dest': 'public/', 'filter': 'isFile'},
                ]
            },
            'libs': {
                'files': [
                    {'expand': true, 'src': ['bower_components/alertifyjs/dist/**'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/bootstrap/dist/**'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/jquery/dist/*.min.js'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/simplemde/dist/**'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/font-awesome-bower/**'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angular/*.min.js'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angular-animate/*.min.js'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angular-bootstrap/*.min.js'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angular-resource/*.min.js'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angular-route/*.min.js'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angular-touch/*.min.js'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angularUtils-pagination/*.js'], 'dest': 'public/', 'filter': 'isFile'},
                ]
            }
        },
        'concat': {
            'project': {
                'src': ['app/**/*.js'],
                'dest': 'public/assets/js/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        'cssmin': {
            'public': {
                'files': []
            }
        },
        'uglify': {
            'options': {
                'mangle': false,
            },
            'project': {
                'files': {
                    // minify from concatenation js
                    'public/assets/js/<%= pkg.name %>-<%= pkg.version %>.min.js': ['public/assets/js/<%= pkg.name %>-<%= pkg.version %>.js']
                }
            },
        },
        'connect': {
            'server': {
                'options': {
                    'port': 9000,
                    'open': true,
                    'keepalive': true
                }
            }
        },
        'jsdoc': {
            'src': ['app/**/*.js'],
            'options': {
                'destination': 'docs'
            }
        }
    });

    grunt.registerTask('build',
        [
            'jshint',
            'copy',
            'concat',
            'uglify',
            'jsdoc'
            //'connect',
        ]);
};
