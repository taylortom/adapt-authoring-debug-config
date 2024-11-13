// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require) {
  const Origin = require('core/origin');
  const ConfigView = require('./views/configView');

  Origin.on('debug:ready', () => {
    Origin.trigger(`debug:addView`, { 
      name: 'config', 
      icon: 'cog', 
      title: 'Config', 
      view: ConfigView
    })
  })
});
