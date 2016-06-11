/*global module:false*/
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var userConfig = require('./build.config.js'),
//TASKS CONFIG---------------------------
    taskConfig = {
      pkg: grunt.file.readJSON('package.json'),
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
      clean: {
        build: '<%= build_dir %>',
        bin: '<%= compile_dir %>'
      },
      notify: {
        js_build_end: {
          options: {
            title: 'FISHY build',
            message: 'Building of project ended.'
          }
        }
      },
      "babel": {
        options: {
          sourceMap: false,
          presets: ['es2015'],
        },
        dist: {
          files: [{
              expand: true,
              cwd: 'src',
              src: ['**/*.js'],
              dest: '<%= compile_dir %>',
              ext: ".js"
          }]
        }
      },
      browserify: {
        dist: {
          src: ["<%= compile_dir %>/**/*.js"],
          dest: '<%= build_dir %>/<%= pkg.name %>.js'
        }
      },
      watch: {
        options: {
          livereload: true
        },
        js: {
          files: [
            'src/**/*.js'
          ],
          tasks: ['build_js_watch', 'notify:js_build_end'],
          options: {
            debounceDelay: 250,
            interrupt: true
          }
        }
      }
  };

  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

//TASKS REG---------------------------

  grunt.registerTask('build_js', ['clean:build', 'clean:bin', 'babel', 'browserify']);
  grunt.registerTask('build_js_watch', ['changed:babel', 'browserify']);
  grunt.registerTask('bbabel', ['babel']);
  grunt.registerTask('default', ['build_js', 'watch']);

};
