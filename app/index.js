'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

//var _modules = require('config.json').modules;
var _modules = ["widget", "settings", "core"];

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    console.log(_modules);

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
    for ( var i = 0; i < _modules.length; i++ ) {
      type = _modules[i];
      base = 'app/' + type;

      if ( !this['add_' + type] ) { break; }

      mkdirp.sync( base );
      mkdirp.sync( base + '/controllers' );
      mkdirp.sync( base + '/services' );
      mkdirp.sync( base + '/directives' );
    }
  },

  copyMainFiles: function() {
    var type, base, context;
    for ( var i = 0; i < _modules.length; i++ ) {
      type = _modules[i];
      base = 'app/' + type;

      if ( !this['add_' + type] ) { break; }

      context = { app_name: this.appName+ '.' + type };
      this.template("_app.js", base + '/' + type + '.js', context);
      this.template("_config.js", base + '/' + type + '.config.js', context);
      this.template("_run.js", base + '/' + type + '.run.js', context);
      this.copy("_main.css", base + "/css/main.css");

      context = { type: type, site_name: this.appName, app_name: this.appName+ '.' + type };
      this.template("_index.html", base + "/index.html", context);
    }
  },

  writing: {
    app: function () {
      console.log(chalk.green('Writing package.json file'));
      this.fs.copy(
          this.templatePath('_package.json'),
          this.destinationPath('package.json')
      );
      console.log(chalk.green('Writing bower.json file'));
      this.fs.copy(
          this.templatePath('_bower.json'),
          this.destinationPath('bower.json')
      );
      console.log(chalk.green('Writing projects files'));
      this.projectfiles();
      console.log(chalk.green('Writing main modules files'));
      this.scaffoldModules();
      console.log(chalk.green('Writing main files'));
      this.copyMainFiles();
    }
  },

  install: function () {
    console.log(chalk.green('Install dependencies'));
    //this.installDependencies();
    console.log(chalk.green('Finished'));
  }
});
