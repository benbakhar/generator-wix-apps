'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var path = require('path');
var _ = require('lodash');

var modules = require('./utils').modules;

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

    this.argument('appname', { type: String, required: false });
    this.appName = this.appname || null; //'wixapp';
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(this.yeoman);
    this.log(yosay(
        'Welcome to the amazing ' + chalk.red('Wixapps') + ' generator!'
    ));
    this.log(chalk.yellow('Out of the box I create an AngularJS app with an Express server.\n'));

    var prompts = [{
      type: 'confirm',
      name: 'addWixService',
      message: 'Would you like to inject Wix service?',
      default: true
    }];

    if ( !this.appName ) {
        prompts.unshift({
          name: 'appName',
          message : 'What is your app\'s name?'
        })
    }

    this.prompt(prompts, function (props) {

      this.filters = {};

      this.appName = this.appName || props.appName;
      this.filters.add_wix_service = props.addWixService;

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

    // Copy core module files
    type = 'core';
    context = { app_name: this.appName+ '.' + type, type: type };
    this.template("js/client/_app.js", 'app/core/' + type + '.js', context);
    this.template("js/client/_config.js", 'app/core/' + type + '.config.js', context);
    this.template("js/client/_run.js", 'app/core/' + type + '.run.js', context);

    // Copy selected services
    this.template("js/client/_services.settings.js", 'app/core/services/SettingsService.js', context);
    if ( this.filters.add_wix_service ) {
      this.template("js/client/_services.wix.js", 'app/core/services/WixService.js', context);
    }

    // Copy widget and settings module files
    for ( var i = 0; i < modules.length; i++ ) {

      type = modules[i];
      base = 'app/' + type;

      if ( type === 'core' ) { continue; }

      // Copy main JS files
      context = { app_name: this.appName+ '.' + type, type: type };
      this.template("js/client/_app.js", base + '/' + type + '.js', context);
      this.template("js/client/_config.js", base + '/' + type + '.config.js', context);
      this.template("js/client/_run.js", base + '/' + type + '.run.js', context);
      this.template("js/client/_app.router.js", base + '/' + type + '.router.js', context);
      this.template('js/client/_app.ctrl.js', base + '/controllers/HomeCtrl.js', context);

      // Copy html files
      context = { type: type, site_name: this.appName, app_name: this.appName+ '.' + type, filters: this.filters };
      this.template("html/_index.html", base + '/' + type +".html", context);
      this.copy("html/_home.html", base + '/views/home.html', context);

      this.copy("sass/_main.css", base + "/style/stylesheets/style.css");
    }

    // Copy server files
    this.copy('js/server/_server.js', 'server/server.js');
    this.copy('js/server/_routes.js', 'server/routes.js');
    this.copy('js/server/_core.index.js', 'server/core/index.js');
    this.copy('js/server/_apiFormatter.js', 'server/core/apiFormatter.js');
    this.copy('js/server/_db.js', 'server/config/db.js');
    this.template('js/server/_config.json', 'server/config/config.json', {app_name: this.appName});
    this.copy('js/server/_settingsAPI.js', 'server/api/settings/settingsAPI.js');
    this.copy('js/server/_settings.router.js', 'server/api/settings/router.js');
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
