(function() {
  var Controller, List, Views,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Controller = require('./controller');

  Views = require('./views');

  List = (function(_super) {

    __extends(List, _super);

    List.prototype.template = Views.list;

    List.prototype.events = {
      'touchstart li': 'touchstart',
      'touchend li': 'touchend',
      'tap li': 'tap'
    };

    function List(options) {
      this.render = __bind(this.render, this);      List.__super__.constructor.apply(this, arguments);
      if (options.model) this.setModel(options.model);
      this.delegate = options.delegate;
    }

    List.prototype.setModel = function(model) {
      this.model = model;
      if (this.model.bind != null) this.model.bind('refresh change', this.render);
      if (this.model.model && (this.model.model.bind != null)) {
        this.model.model.bind('refresh change', this.render);
      }
      return this.render();
    };

    List.prototype.render = function() {
      this.items = this.model.all();
      return List.__super__.render.apply(this, arguments);
    };

    List.prototype.tap = function(e) {
      var index, item;
      index = $(e.target).attr("data-index");
      item = this.items[index];
      return this.delegate.didSelect(item);
    };

    List.prototype.touchstart = function(e) {
      return $(e.target).addClass('touch');
    };

    List.prototype.touchend = function(e) {
      return $(e.target).removeClass('touch');
    };

    return List;

  })(Controller);

  module.exports = List;

}).call(this);
