(function() {
  var Controller, Form, Views,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Controller = require('./controller');

  Views = require('./views');

  Form = (function(_super) {

    __extends(Form, _super);

    Form.prototype.template = Views.form;

    Form.prototype.tag = "form";

    function Form() {
      this.didSubmit = __bind(this.didSubmit, this);
      var field, label, _base, _ref;
      Form.__super__.constructor.apply(this, arguments);
      this.object || (this.object = {});
      this.types || (this.types = {});
      _ref = this.fields;
      for (field in _ref) {
        label = _ref[field];
        (_base = this.types)[field] || (_base[field] = "text");
      }
      this.render();
      this.buttons = this.$(".form-row.buttons");
    }

    Form.prototype.render = function() {
      Form.__super__.render.apply(this, arguments);
      return this.el.live("submit", this.didSubmit);
    };

    Form.prototype.didSubmit = function(e) {
      var d, data, _i, _len;
      e.preventDefault();
      data = this.el.serializeArray();
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        d = data[_i];
        this.object[d.name] = d.value;
      }
      return this.delegate.didSubmit(this.object);
    };

    Form.prototype.submit = function() {
      return this.el.trigger('submit');
    };

    Form.prototype.reset = function() {
      return this.el.find("input, textarea").val('');
    };

    Form.prototype.setValues = function(values) {
      var key, value, _results;
      _results = [];
      for (key in values) {
        value = values[key];
        _results.push(this.el.find("[name=" + key + "]").val(value));
      }
      return _results;
    };

    return Form;

  })(Controller);

  module.exports = Form;

}).call(this);
