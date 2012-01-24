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
      'click li': 'didClick'
    };

    function List() {
      this.refresh = __bind(this.refresh, this);      List.__super__.constructor.apply(this, arguments);
      this.items || (this.items = []);
      if (this.model) this.model.bind('refresh', this.refresh);
      if (this.model) this.model.bind('change', this.refresh);
      if (this.type != null) this.el.addClass(this.type);
      this.refresh();
    }

    List.prototype.refresh = function() {
      if (this.model) {
        this.items = this.predicate ? this.model.select(this.predicate) : this.model.all();
      }
      if (this.sort) this.items = this.items.sort(this.sort);
      return this.render();
    };

    List.prototype.didClick = function(e) {
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
