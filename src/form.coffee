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
  
  events:
    "submit form": "didSubmit"
  
  constructor: ->
    super
    @object or= {}
    @types or= {}
    for field, label of @fields
      @types[field] or= "text"
    @render()
  
  didSubmit: (e) ->
    e.preventDefault()
    data = @el.find("form").serializeArray()
    @object[d.name] = d.value for d in data
    @delegate.didSubmit(@object)


module.exports = Form