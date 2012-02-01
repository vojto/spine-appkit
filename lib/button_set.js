(function() {
  var ButtonSet;

  ButtonSet = (function() {

    function ButtonSet(buttons, classes) {
      var action, button, label;
      this.el = $("<div />").addClass('button-set');
      for (label in buttons) {
        action = buttons[label];
        button = $("<a />").addClass('button');
        if (classes != null) button.addClass(classes);
        button.text(label).click(action);
        this.el.append(button);
      }
    }

    return ButtonSet;

  })();

  module.exports = ButtonSet;

}).call(this);
