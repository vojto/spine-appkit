Controller = require('./controller')
Views      = require('./views')

# Form
##
class Form extends Controller
  template: Views.form
  template: -> ""
  
  events:
    "tap input[type=submit]": "didTapSubmit"
    "submit form": "didSubmit"
  
  constructor: ->
    super
    @object or= {}
    for field, label of @fields
      @types[field] or= "text"
    @render()
  
  didSubmit: ->
    false
  
  didTapSubmit: ->
    data = @el.find("form").serializeArray()
    @object[d.name] = d.value for d in data
    @delegate.didSubmit(@object)
    false

module.exports = Form