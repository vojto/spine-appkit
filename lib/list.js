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
      this.inside = $("<div class='inside' />");
      this.el.append(this.inside);
      this.selectionIndex = -1;
      this.refresh();
    }

    List.prototype.refresh = function() {
      if (this.model) {
        this.items = this.predicate ? this.model.select(this.predicate) : this.model.all();
      }
      if (this.sort) this.items = this.items.sort(this.sort);
      this.render();
      if (this.selectionIndex !== -1) {
        this.$('li').removeClass('active');
        return this.elementAtIndex(this.selectionIndex).addClass('active');
      }
    };

    List.prototype.render = function() {
      var index, item, itemView, _len, _ref;
      this.inside.empty();
      _ref = this.items;
      for (index = 0, _len = _ref.length; index < _len; index++) {
        item = _ref[index];
        itemView = $(Views.list_item({
          list: this,
          item: item,
          index: index
        }));
        this.inside.append(itemView);
      }
      return this.trigger('didRender');
    };

    List.prototype.didClick = function(e) {
      var item, target;
      target = $(e.target);
      item = this.itemForTarget(target);
      if (target.hasClass("accessory")) {
        return this.delegate.didSelectAccessory(item, this);
      } else {
        return this.delegate.didSelect(item, this);
      }
    };

    List.prototype.indexForTarget = function(target) {
      var li;
      target = $(target);
      li = target.get(0).tagName === "LI" ? target : target.parents("li:first");
      return this.inside.children().index(li);
    };

    List.prototype.itemAtIndex = function(domIndex) {
      var index;
      index = $(this.inside.children().get(domIndex)).attr("data-index");
      return this.items[index];
    };

    List.prototype.itemForTarget = function(target) {
      return this.itemAtIndex(this.indexForTarget(target));
    };

    List.prototype.elementAtIndex = function(index) {
      return this.inside.find("li[data-index=" + index + "]");
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
