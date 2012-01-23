Controller = require('./controller')
Views      = require('./views')

# Form
# 
# Controls form view
#
# Usage: new Form(fields: {fields: "Field Label", another_field: "Another Label"})
##
class Form extends Controller
  template: Views.form
  tag: "form"
  
  constructor: ->
    super
    @object or= {}
    @types or= {}
    for field, label of @fields
      @types[field] or= "text"
    @render()
    
  render: ->
    super
    @el.live "submit", @didSubmit
  
  didSubmit: (e) =>
    e.preventDefault()
    data = @el.serializeArray()
    @object[d.name] = d.value for d in data
    @delegate.didSubmit(@object)
  
  submit: ->
    @el.trigger('submit')


module.exports = Form