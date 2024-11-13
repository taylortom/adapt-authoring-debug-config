// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require){
  var Origin = require('core/origin');
  var OriginView = require('core/views/originView');

  var ConfigView = OriginView.extend({
    tagName: 'div',
    className: 'config',
    events: {
      'click button.save': 'onButtonClicked'
    },

    preRender: async function() {
      const config = await $.get('/api/config?mutable=true');
      $('#data').empty();
      Object.entries(config).forEach(([key, val]) => {
        const $container = $('<div class="input-wrapper">');
        $container.append(`<label for="${key}">${key}`);
        $container.append(`<input id="${key}" value="${val}">`);
        $('.data').append($container)
      });
    },

    getData: function() {
      const data = {};
      $('.data input').each((i, input) => {
        data[$(input).attr('id')] = $(input).val();
      });
      return data;
    },

    onButtonClicked: async function() {
      try {
        await $.ajax('/api/debug/config', { 
          method: 'PUT', 
          data: this.getData(), 
          dataType: 'json' 
        });
      } catch(e) {
        Origin.Notify.alert({
          type: 'error',
          text: e.responseJSON || e.toString()
        });
      }
    }
  }, {
    template: 'config'
  });

  return ConfigView;
});
