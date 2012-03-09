(function() {
  var Controller, List, ListItem, Util, Views,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Controller = require('./controller');

  Views = require('./views');

  Util = require('./util');

  List = (function(_super) {

    __extends(List, _super);

    List.prototype.tag = 'ul';

    List.prototype.className = 'list';

    List.prototype.itemView = Views.list_item;

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
      if (this.model) this.model.bind('create', this.refresh);
      if (this.type != null) this.el.addClass(this.type);
      this.inside = $("<div class='inside' />");
      this.el.append(this.inside);
      this.selectionIndex = -1;
      this.refresh();
    }

    List.prototype.refresh = function() {
      if (this.model) this.items = this.findItems();
      this.render();
      return this.reselect();
    };

    List.prototype.findItems = function() {
      var items;
      items = this.predicate ? this.findWithPredicate() : this.model.all();
      if (this.sort) items.sort(this.sort);
      return items;
    };

    List.prototype.findWithPredicate = function() {
      return this.model.select(this.predicate);
    };

    List.prototype.render = function() {
      var index, item, _len, _ref;
      this.inside.empty();
      _ref = this.items;
      for (index = 0, _len = _ref.length; index < _len; index++) {
        item = _ref[index];
        item = new ListItem({
          list: this,
          item: item,
          index: index,
          template: this.itemView
        });
        this.inside.append(item.el);
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
      li = target.is('li.list-item') ? target : target.parents("li.list-item:first");
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

    List.prototype.itemClass = function() {
      return '';
    };

    List.prototype.selectAtIndex = function(index) {
      this.selectionIndex = index;
      this.$('li.list-item').removeClass('active');
      return this.elementAtIndex(index).addClass('active');
    };

    List.prototype.selectItem = function(item) {
      var index;
      if (typeof item.eql === 'function') {
        index = Util.indexOfEql(this.items, item);
      } else {
        index = this.items.indexOf(item);
      }
      return this.selectAtIndex(index);
    };

    List.prototype.reselect = function() {
      if (this.selectionIndex !== -1) {
        return this.selectAtIndex(this.selectionIndex);
      }
    };

    return List;

  })(Controller);

  ListItem = (function(_super) {

    __extends(ListItem, _super);

    ListItem.prototype.tag = "li";

    ListItem.prototype.className = "list-item";

    function ListItem() {
      this.render = __bind(this.render, this);      ListItem.__super__.constructor.apply(this, arguments);
      this.item.bind('change', this.render);
      this.render();
    }

    ListItem.prototype.render = function() {
      this.el.removeClass().addClass(this.className);
      this.el.addClass(this.list.itemClass(this.item));
      this.el.attr('data-index', this.index);
      ListItem.__super__.render.apply(this, arguments);
      this.list.trigger('didRender');
      return this.list.reselect();
    };

    return ListItem;

  })(Controller);

  module.exports = List;

}).call(this);
