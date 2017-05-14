module.exports = function(grunt) {

  grunt.initConfig({
    less: {
      options: {
        compress: true,
        sourceMap: false
      },
      development: {
        files: {
          'public/css/style.css': [
            'assets/less/style.less'
          ]
        }
      }
    },
    uglify: {
      options: {
        compress: true,
        beautify: false
      },
      development: {
        files: {
          'public/js/main.js': [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/js/tab.js',
            'node_modules/bootstrap/js/transition.js',
            'assets/js/main.js'
          ]
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/bootstrap/dist/fonts/',
            src: ['**'],
            dest: 'public/fonts/bootstrap/',
            filter: 'isFile'
          }
        ],
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['less', 'uglify', 'copy']);

};