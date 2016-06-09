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
        build: '<%= build_dir %>'
      },
      notify: {
        js_build_end: {
          options: {
            title: 'FISHY build',
            message: 'Building of project ended.'
          }
        },
        css_build_end: {
          options: {
            title: 'OPTA v3 CSS build',
            message: 'Building of CSS files ended.'
          }
        },
        active_watch: {
          options: {
            title: 'FISHY Watcher',
            message: 'Watcher is active!'
          }
        }
      },
      browserify: {
        dist: {
          options: {
            transform: [["babelify", { "presets": ["es2015"]}]]
          },
          src: ["src/**/*.js"],
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
          tasks: ['build_js', 'notify:js_build_end'],
          options: {
            debounceDelay: 250,
            interrupt: true
          }
        }
      }
  };

  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

//TASKS REG---------------------------

  grunt.registerTask('build_js', ['clean:build', 'browserify']);
  grunt.registerTask('default', ['build_js', 'watch', 'notify:active_watch']);

};
