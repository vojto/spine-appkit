(function() {
  var Controller, GroupedList, Views,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Controller = require('./controller');

  Views = require('./views');

  GroupedList = (function(_super) {

    __extends(GroupedList, _super);

    GroupedList.prototype.tag = 'ul';

    GroupedList.prototype.className = 'grouped-list';

    function GroupedList() {
      GroupedList.__super__.constructor.apply(this, arguments);
      this.render();
    }

    GroupedList.prototype.render = function() {
      var item, name, view, _ref, _results;
      _ref = this.groups;
      _results = [];
      for (name in _ref) {
        view = _ref[name];
        item = $("<li />");
        item.append($("<h3 />").text(name));
        view.el.addClass('group');
        item.append(view.el);
        _results.push(this.append(item));
      }
      return _results;
    };

    return GroupedList;

  })(Controller);

  module.exports = GroupedList;

}).call(this);
