class ButtonSet
  constructor: (buttons, classes) ->
    @el = $("<div />").addClass('button-set')
    for label, action of buttons
      button = $("<a />").addClass('button')
      button.addClass(classes) if classes?
      button.text(label).click(action)
      @el.append(button)
      
module.exports = ButtonSet