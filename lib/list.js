(function() {
  var Controller, List, Views,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Controller = require('./controller');

  Views = require('./views');

  List = (function(_super) {

    __extends(List, _super);

    List.prototype.tag = 'ul';

    List.prototype.className = 'list';

    List.prototype.template = Views.list;

    List.prototype.events = {
      'touchstart li': 'touchstart',
      'touchend li': 'touchend',
      'tap li': 'tap'
    };

    function List() {
      this.refresh = __bind(this.refresh, this);      List.__super__.constructor.apply(this, arguments);
      this.items = [];
      this.model.bind('refresh', this.refresh);
      if (this.type != null) this.el.addClass(this.type);
      this.render();
    }

    List.prototype.refresh = function() {
      this.items = this.model.all();
      return this.render();
    };

    List.prototype.tap = function(e) {
      var index, item;
      index = this.$("> li").index($(e.target));
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
