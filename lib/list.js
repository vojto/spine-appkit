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

    List.prototype.events = {
      'touchstart li': 'touchstart',
      'touchend li': 'touchend',
      'click li': 'didClick'
    };

    function List() {
      this.didClick = __bind(this.didClick, this);
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

    List.prototype.render = function() {
      var inside, item, itemView, _i, _len, _ref, _results;
      this.el.empty();
      inside = $("<div class='inside' />");
      this.el.append(inside);
      _ref = this.items;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        itemView = $(Views.list_item({
          list: this,
          item: item
        }));
        _results.push(inside.append(itemView));
      }
      return _results;
    };

    List.prototype.didClick = function(e) {
      var index, item, li, target;
      target = $(e.target);
      li = target.get(0).tagName === "LI" ? target : target.parent();
      index = this.$("> .inside > li").index(li);
      item = this.items[index];
      if (target.hasClass("accessory")) {
        return this.delegate.didSelectAccessory(item);
      } else {
        return this.delegate.didSelect(item);
      }
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
