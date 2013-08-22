'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: 'localhost'
        }
      }
    },
    uglify: {
      js: {
        files: {
          'js/app.min.js': ['js/app.js']
        }
      }
    },
    cssmin: {
      css: {
        files: {
          'css/style.min.css': ['css/style.css']
        }
      }
    },
    jshint: {
      app: ['js/app.js']
    },
    watch: {
      js: {
        files: 'js/app.js',
        tasks: ['jshint', 'uglify'],
        options: {
          livereload: true
        }
      },
      html: {
        files: '**/*.html',
        tasks: [],
        options: {
          livereload: true
        }
      },
      css: {
        files: 'css/style.css',
        tasks: ['cssmin'],
        options: {
          livereload: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('server', ['connect', 'watch']);
}

