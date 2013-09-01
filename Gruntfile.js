module.exports = function(grunt) {
  grunt.initConfig({
      pkg : grunt.file.readJSON('package.json'),

      jshint: {
        files: ['Gruntfile.js', '<%= pkg.name %>.js'],
        options: {
          globals: {
            window: true
          }
        }
      },
      uglify: {
        options: {

          banner: '/*  <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) */\n\n'
        },
        build: {
          src: '<%= pkg.name %>.js',
          dest: 'build/<%= pkg.name %>.min.js',
          options: {
              sourceMap: 'build/<%= pkg.name %>.min.map',
              sourceMappingURL: '<%= pkg.name %>.min.map',
              preserveComments: 'some'
          }
        }
      },
      mocha: {
          test: {
            src: ['tests/index.html']
          }
      },
      growl: {
          complete : {
              title : "Pablo",
              message : "Build complete",
              image : __dirname + "/tests/images/pablo.png"
          }
      },
      watch: {
          js: {
              files: ['<%= pkg.name %>.js'],
              tasks: ['jshint', 'mocha', 'uglify'],
              options: {
                spawn: false
              }
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Growl notifications also requires `gem install terminal-notifier`
  grunt.loadNpmTasks('grunt-growl');

  grunt.registerTask('test', ['jshint', 'mocha']);
  grunt.registerTask('default', ['jshint', 'uglify', 'growl:complete']);
};