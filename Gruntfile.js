
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      basic: {
        src: ['node_modules/usco-assetmanager/src/assetManager.coffee',
        'node_modules/usco-xhr-store/src/xhrStore.coffee',
        'node_modules/usco-stl-parser/STLParser.js',
        'node_modules/usco-amf-parser/AMFParser_stream.js',
        'node_modules/usco-obj-parser/OBJParser.js',
        'node_modules/usco-ply-parser/PLYParser.js',
        ],
        dest: 'build/<%= pkg.name %>.js',
        options: {
          transform: ['coffeeify'],
          ignore:["three"],
          external: [],
          alias:[
            'node_modules/usco-assetmanager/src/assetManager.coffee:assetManager',
            'node_modules/usco-xhr-store/src/xhrStore.coffee:usco-xhr-store',
            'node_modules/usco-stl-parser/STLParser.js:usco-stl-parser',
            'node_modules/usco-amf-parser/AMFParser_stream.js:usco-amf-parser',
            'node_modules/usco-obj-parser/OBJParser.js:usco-obj-parser',
            'node_modules/usco-ply-parser/PLYParser.js:usco-ply-parser'
          ],
          aliasMappings: [
            {
              cwd: 'shared',
              src: ['**/*.js'],
              dest: 'lib',
            },
          ]
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'build/<%= pkg.name %>.min.js': ['build/<%= pkg.name %>.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  //release cycle
  grunt.loadNpmTasks('grunt-contrib-uglify');


  // Task(s).
  grunt.registerTask('test', ['jshint', 'jasmine_node']);
  grunt.registerTask('build', ['jshint', 'jasmine_node','concat','uglify']);
  grunt.registerTask('release', ['concat','uglify','jasmine_node','release']);
  grunt.registerTask('default', ['browserify','uglify']);
};

//see https://github.com/jmreidy/grunt-browserify/blob/master/examples/mappings/Gruntfile.js

