(function() {
  var Button, Spine;

  Spine = require('spine');

  Button = (function() {

    function Button(label, action, classes) {
      this.el = $("<a />").addClass("button").addClass(classes).text(label);
      this.el.bind('click', action);
    }

    return Button;

  })();

  module.exports = Button;

}).call(this);
