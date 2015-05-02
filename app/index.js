'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

var modules = require('./utils').modules;

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(this.yeoman);
    this.log(yosay(
        'Welcome to the amazing ' + chalk.red('Wixapps') + ' generator!'
    ));

    var prompts = [{
      name: 'appName',
      message : 'What is your app\'s name'

    },{
      type: 'confirm',
      name: 'addWidgetModule',
      message: 'Would you like to scaffold a widget module?',
      default: true
    },{
      type: 'confirm',
      name: 'addSettingsModule',
      message: 'Would you like to scaffold a settings module?',
      default: true
    },{
      type: 'confirm',
      name: 'addCoreModule',
      message: 'Would you like to scaffold a core module?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.add_widget = props.addWidgetModule;
      this.add_settings = props.addSettingsModule;
      this.add_core = props.addCoreModule;

      done();
    }.bind(this));
  },

  projectfiles: function () {
    this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
    );
    this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
    );
  },

  scaffoldModules: function() {
    var type, base;
    for ( var i = 0; i < modules.length; i++ ) {
      type = modules[i];
      base = 'app/' + type;

      if ( !this['add_' + type] ) { break; }

      mkdirp.sync( base );
      mkdirp.sync( base + '/controllers' );
      mkdirp.sync( base + '/services' );
      mkdirp.sync( base + '/directives' );
      mkdirp.sync( base + '/style' );
      mkdirp.sync( base + '/style/stylesheets' );
    }

    mkdirp.sync('server');
    mkdirp.sync('server/config');
    mkdirp.sync('server/api');
    mkdirp.sync('server/api/settings');
  },

  copyMainFiles: function() {
    var type, base, context;

    // Copy client files
    for ( var i = 0; i < modules.length; i++ ) {
      type = modules[i];
      base = 'app/' + type;

      if ( !this['add_' + type] ) { break; }

      // Copy main JS files
      context = { app_name: this.appName+ '.' + type, type: type };
      this.template("js/_app.js", base + '/' + type + '.js', context);
      this.template("js/_config.js", base + '/' + type + '.config.js', context);
      this.template("js/_run.js", base + '/' + type + '.run.js', context);
      this.template("js/_app.router.js", base + '/' + type + '.router.js', context);

      this.template('js/_app.ctrl.js', base + '/controllers/HomeCtrl.js', context);

      // Copy html files
      context = { type: type, site_name: this.appName, app_name: this.appName+ '.' + type };
      this.template("html/_index.html", base + '/' + type +".html", context);
      this.copy("html/_home.html", base + '/views/home.html', context);

      this.copy("sass/_main.css", base + "/style/stylesheets/style.css");
    }

    // Copy server files
    this.copy('js/_server.js', 'server/server.js');
    this.copy('js/_routes.js', 'server/routes.js');
    this.copy('js/_core.index.js', 'server/core/index.js');
    this.copy('js/_apiFormatter.js', 'server/core/apiFormatter.js');
    this.copy('js/_db.js', 'server/config/db.js');
    this.template('js/_config.json', 'server/config/config.json', {app_name: this.appName});
    this.copy('js/_settingsAPI.js', 'server/api/settings/settingsAPI.js');
    this.copy('js/_settings.router.js', 'server/api/settings/router.js');
    this.copy("html/_helloWorld.html", 'server/helloWorld.html');
  },

  writing: {
    app: function () {
      //this.copy('_Gruntfile.js', 'Gruntfile.js');

      this.gruntfile.loadNpmTasks('grunt-nodemon');
      this.gruntfile.loadNpmTasks('grunt-contrib-watch');
      //this.gruntfile.insertConfig('watch', '{ scripts: {files: [\'**/*.js\'], tasks: [\'jshint\'], options: {spawn: false, livereload: true } } }\'');
      this.gruntfile.insertConfig('nodemon', '{ dev: { script: \'server/server.js\'} }');
      this.gruntfile.registerTask('build', 'compass');
      this.gruntfile.registerTask('serve', ['nodemon', 'watch']);

      this.fs.copy(
          this.templatePath('_package.json'),
          this.destinationPath('package.json')
      );
      this.fs.copy(
          this.templatePath('_bower.json'),
          this.destinationPath('bower.json')
      );
      this.projectfiles();
      console.log(chalk.green('Writing main modules files'));
      this.scaffoldModules();
      this.copyMainFiles();
    }
  },

  install: function () {
    console.log(chalk.green('Installing dependencies'));
    this.installDependencies();
  }
});
