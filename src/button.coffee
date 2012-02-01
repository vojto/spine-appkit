Spine = require('spine')

class Button
  constructor: (label, action, classes) ->
    @el = $("<a />").addClass("button").addClass(classes).text(label)
    @el.bind 'click', action

module.exports = Button